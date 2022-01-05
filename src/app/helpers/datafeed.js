/* eslint-disable import/no-webpack-loader-syntax */
import moment from 'moment';
import config from '../../config';
import worker from 'workerize-loader!./calculateCandles.js';
import Store from '../redux/Store';

const lastBarsCache = new Map();

const resolutions = {
  1: '1',
  5: '5',
  15: '15',
  30: '30',
  60: '1H',
  120: '2H',
  240: '4H',
  720: '12H',
  1440: '24H',
};

const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '1H', '2H', '4H', '12H', '24h'],
  // supported_resolutions: ['1M', '1D', '1W', '1M'],
  currency_codes: ['BNB', 'USD'],
};

function onReady(callback) {
  // console.log('[onReady]: Method call');
  setTimeout(() => callback(configurationData));
}

async function resolveSymbol(
  symbolName,
  onSymbolResolvedCallback,
  onResolveErrorCallback,
  extension,
) {
  // console.log('[resolveSymbol]: Method call', symbolName, extension.currencyCode);
  const view = Store.getState().View;
  const filter = {
    where: {
      // symbol: { regexp: new RegExp(`.*${symbolName.split('/')[0]}.*`, 'i').toString() },
      contractAddress: { regexp: new RegExp(`.*${view.tokenAddress}.*`, 'i').toString() },
    },
    limit: 1,
  };
  console.log(config.API_URL,'api url');


  
  const response = await fetch(`${config.API_URL}/tokens/search?filter=${JSON.stringify(filter)}`);
  const jsonData = await response.json();

  // console.log('DEBUG', view.version === 'v1' ? jsonData.data[0].v1PairAddress : jsonData.data[0].v2PairAddress)

  if (jsonData.success && jsonData.data.length > 0) {
    const symbolInfo = {
      // ticker: `${jsonData.data[0].symbol}`,
      ticker: symbolName,
      pro_name: symbolName,
      contract: view.tokenAddress,
      // pro_name: jsonData.data[0].symbol,
      // description: "DESC",
      type: 'index',
      // session: '24x7',
      timezone: 'Etc/UTC',
      // exchange: 'exchange',
      minmov: 1,
      minmove2: 0,
      // pricescale: 100,
      pricescale: (extension.currencyCode || 'USD') === 'USD' ? 100000000 : 100000000,
      name: symbolName,
      has_intraday: true,
      has_no_volume: false,
      volume_precision: 100,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      // volume_precision: 2,
      data_status: 'delayed_streaming',
      // data_status: 'pulsed',
      currency_codes: ['USD', 'BNB'],
      original_currency_code: 'USD',
      currency_code: extension.currencyCode || 'USD',
    };

    // console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  } else {
    onResolveErrorCallback('ERROR');
  }
}

let lastBnbUsdPrice = 1;

async function getBars(
  symbolInfo,
  resolution,
  rangeStartDate,
  rangeEndDate,
  onResult,
  onError,
  isFirstCall,
) {
  // console.log('[getBars]: Method call', symbolInfo, resolution, rangeStartDate, rangeEndDate, isFirstCall);

  try {
    const [symbol, version] = symbolInfo.full_name.split('/');
    const { contract } = symbolInfo;
    // const response = await fetch(`${config.API_URL}/pair/${symbolInfo.pro_name}?from=${rangeStartDate}&to=${rangeEndDate}&resolution=${resolutions[resolution]}`);
    const response = await fetch(
      `${
        config.API_URL
      }/pair/contract/${contract}?from=${rangeStartDate}&to=${rangeEndDate}&resolution=${
        resolutions[resolution]
      }&version=${version.toLowerCase()}&relatedTo=${symbolInfo.currency_code.toLowerCase()}`,
    );
    const jsonData = await response.json();

    if (jsonData.success) {
      const dataset = jsonData.data.map((el) => {
        return {
          time: Number(moment.utc(el.time, 'YYYY-MM-DD HH:mm:ss').format('x')),
          open: Number(el.open),
          high: Number(el.high),
          low: Number(el.low),
          close: Number(el.close),
          volume: Number(el.volume),
        };
      });

      // lastBnbUsdPrice =

      // Emit last candle close price to update in tokenInfo;
      // const event = new CustomEvent('lastPrice', {
      //   detail: {
      //     currency: symbolInfo.currency_code,
      //     price: dataset[0].close,
      //   }
      // });
      // document.dispatchEvent(event);

      onResult(dataset.reverse(), {
        noData: dataset.length === 0,
      });
    } else {
      onResult([], {
        noData: true,
      });
    }

    return;
  } catch (error) {
    // console.log('[getBars]: Get error', error);
    onError(error);
  }
}

let subscribeInterval = null;
let history = [];
let lastUpdate = 0;
let _symbolInfo = {};
let _resolution = 5;
let _updateCallback = null;

const UpdateBasedOnHistory = async (e) => {
  console.time('StartUpdate');

  let bnbUsdRate = 1;
  if (_symbolInfo.currency_code === 'USD') {
    // lastUpdate = 0;
    const coingeckoRes = await fetch('https://api.coingecko.com/api/v3/coins/binancecoin');
    const jsonData = await coingeckoRes.json();
    bnbUsdRate = jsonData.market_data.current_price.usd;
  }

  const tickerParams = _symbolInfo.pro_name.split('/');
  history = [...e.detail]
    .filter(
      (el) =>
        el.primaryTokenSymbol === tickerParams[0] || el.secondaryTokenSymbol === tickerParams[0],
    )
    .sort((a, b) => a.block - b.block);
  // history = [...history, ...e.detail].sort((a, b) => a.block - b.block);

  // console.log('history', history)
  // history = history.slice(history.length > 500 ? history.length - 500 : 0, history.length - 1)

  if (
    (history.length > 0 && (Number(_resolution) === 1 || Number(_resolution) === 5)) ||
    Number(_resolution) === 15
  ) {
    if (typeof Worker !== undefined) {
      worker()
        .calculateCandles(lastUpdate, history, _resolution, _symbolInfo, bnbUsdRate)
        .then((candles) => {
          for (const data of candles) {
            if (lastUpdate <= data.time && _updateCallback) {
              lastUpdate = data.time;
              // console.log('UPDATE BASED ON HISTORY', data)
              _updateCallback(data);
            }
          }

          // Emit last candle close price to update in tokenInfo;
          const event = new CustomEvent('lastPrice', {
            detail: {
              currency: _symbolInfo.currency_code,
              price: candles[candles.length - 1].close,
            },
          });
          document.dispatchEvent(event);
        });
    }

    // let from = moment(lastUpdate, 'x').subtract(10, 'minutes').startOf('minute');
    // if(lastUpdate === 0) {
    //   from = moment(history[0].datetime, 'DD-MM-YYYY HH:mm:ss').startOf('minute');
    // }
    // const to = moment(history[history.length - 1].datetime, 'DD-MM-YYYY HH:mm:ss').startOf('minute').add(Number(_resolution), 'minute');

    // let candles = [];

    // while (from.isBefore(to)) {
    //   // eslint-disable-next-line no-loop-func
    //   const logs = history.filter(el => moment(el.datetime, 'DD-MM-YYYY HH:mm:ss').isBetween(from, moment(from).endOf('minute'), undefined, '[]'));
    //   // console.log(history[100].datetime);
    //   const sortedLogs = [...logs].sort((a, b) => b.pricePerTokenNum - a.pricePerTokenNum);
    //   // console.log(from.toLocaleString(), logs);

    //   if (logs.length > 0) {
    //     const first = logs.filter(el => el.block === logs[0].block).sort((a, b) => a.block - b.block);
    //     const last = logs.filter(el => el.block === logs[logs.length - 1].block).sort((a, b) => b.block - a.block);
    //     const candle = {
    //       time: Number(moment.utc(from).format('x')),
    //       // open: Number(logs[0].pricePerTokenNum) * (symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       open: Number(first[0].pricePerTokenNum) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       low: Number(sortedLogs[sortedLogs.length - 1].pricePerTokenNum) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       high: Number(sortedLogs[0].pricePerTokenNum) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       // close: Number(logs[logs.length - 1].pricePerTokenNum) * (symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       close: Number(last[0].pricePerTokenNum) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //       volume: logs.reduce((acc, current) => acc += current.pricePerTokenNum * current.tokensNum, 0) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
    //     }
    //     candles.push(candle);
    //   }
    //   from = from.add(Number(_resolution), 'minute')
    // }

    // candles = candles.sort((a, b) => a.time - b.time)

    // for (const data of candles) {
    //   if (lastUpdate <= data.time && _updateCallback) {
    //     lastUpdate = data.time
    //     _updateCallback(data)
    //   }
    //   // onRealtimeCallback(data);
    // }

    // console.log('lastCandle', moment(candles[candles.length - 1].time, 'x').toLocaleString(), candles[candles.length - 1])

    // console.log(history[history.length - 1]?.time, from.toLocaleString(), to.toLocaleString())
  } else {
    lastUpdate = 0;
  }
  console.timeEnd('StartUpdate');
};

function subscribeBars(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscribeUID,
  onResetCacheNeededCallback,
) {
  // console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID, resolution, symbolInfo);

  subscribeInterval = setInterval(async () => {
    try {
      const [symbol, version] = symbolInfo.full_name.split('/');
      const { contract } = symbolInfo;
      // const response = await fetch(`${config.API_URL}/pair/${symbolInfo.pro_name}?from=${moment().subtract(10, 'minutes').format('X')}&to=${moment().add('1', 'minute').format('X')}&resolution=${resolutions[resolution]}`);
      const response = await fetch(
        `${config.API_URL}/pair/contract/${contract}?from=${moment()
          .subtract(10, 'minutes')
          .format('X')}&to=${moment().add('1', 'minute').format('X')}&resolution=${
          resolutions[resolution]
        }&version=${version.toLowerCase()}&relatedTo=${symbolInfo.currency_code.toLowerCase()}`,
      );
      const jsonData = await response.json();

      if (jsonData.success) {
        const dataset = jsonData.data.map((el) => {
          return {
            time: Number(moment.utc(el.time, 'YYYY-MM-DD HH:mm:ss').format('x')),
            open: Number(el.open),
            high: Number(el.high),
            low: Number(el.low),
            close: Number(el.close),
            volume: Number(el.volume),
          };
        });
        if (dataset.length > 0) {
          // console.log('-------------------------------------------NEW UPDATE-------------------------------------------')
          for (const data of dataset.reverse()) {
            if (lastUpdate <= data.time) {
              // console.log('update', moment(data.time, 'x').toDate().toLocaleString(), data)
              lastUpdate = data.time;
              onRealtimeCallback(data);
            }
          }
        }
      }
    } catch (error) {
      // console.log('[subscribeBars]: Get error', error);
    }
  }, 10000);

  const [, version] = symbolInfo.full_name.split('/');

  _symbolInfo = symbolInfo;
  _resolution = resolution;
  _updateCallback = onRealtimeCallback;
  lastUpdate = 0;

  document.addEventListener('txHistory', UpdateBasedOnHistory);
}

function unsubscribeBars(listenerGuid) {
  // console.log(listenerGuid);
  console.log('unsubscribe bars');
  history = [];
  lastUpdate = 0;
  document.removeEventListener('txHistory', UpdateBasedOnHistory);
  clearInterval(subscribeInterval);
}

async function searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
  // console.log('[searchSymbols]: Method call', userInput, exchange, symbolType);
  // const symbols = await getAllSymbols();
  // const newSymbols = symbols.filter(symbol => {
  //   const isExchangeValid = exchange === '' || symbol.exchange === exchange;
  //   const isFullSymbolContainsInput = symbol.full_name
  //     .toLowerCase()
  //     .indexOf(userInput.toLowerCase()) !== -1;
  //   return isExchangeValid && isFullSymbolContainsInput;
  // });
  // onResultReadyCallback(newSymbols);
}

const Datafeed = {
  onReady,
  resolveSymbol,
  getBars,
  subscribeBars,
  unsubscribeBars,
  searchSymbols,
};

export default Datafeed;
