const moment = require('moment');
const BigNumber = require('bignumber.js');

export function calculateCandles(lastUpdate, history, _resolution, _symbolInfo, bnbUsdRate) {
  let from = moment(lastUpdate, 'x').subtract(10, 'minutes').startOf('minute');
  if (lastUpdate === 0) {
    from = moment(history[0].datetime, 'DD-MM-YYYY HH:mm:ss').startOf('minute');
  }
  if (Number(_resolution) === 5 || Number(_resolution) === 15) {
    from = moment(from).set('minute', 0);
  }
  const to = moment(history[history.length - 1].datetime, 'DD-MM-YYYY HH:mm:ss')
    .startOf('minute')
    .add(Number(_resolution), 'minute');
  let candles = [];

  while (from.isBefore(to)) {
    // eslint-disable-next-line no-loop-func
    let endInterval = moment(from);
    if (Number(_resolution) === 1) {
      endInterval = endInterval.endOf('minute');
    } else if (Number(_resolution) === 5) {
      endInterval = endInterval.add(5, 'minute').endOf('minute');
    } else if (Number(_resolution) === 15) {
      endInterval = endInterval.add(15, 'minute').endOf('minute');
    }
    const logs = history.filter((el) =>
      moment(el.datetime, 'DD-MM-YYYY HH:mm:ss').isBetween(from, endInterval, undefined, '[]'),
    );
    // console.log('UPDATE BASED ON HISTORY', _resolution, from.toLocaleString(), endInterval.toLocaleString(), logs.length)
    // console.log(history[100].datetime);
    const sortedLogs = [...logs].sort(
      (a, b) => Number(b.pricePerTokenNum) - Number(a.pricePerTokenNum),
    );
    // console.log(from.toLocaleString(), logs);

    if (logs.length > 0) {
      const first = logs
        .filter((el) => el.block === logs[0].block)
        .sort((a, b) => a.block - b.block);
      const last = logs
        .filter((el) => el.block === logs[logs.length - 1].block)
        .sort((a, b) => b.block - a.block);
      const candle = {
        time: Number(moment.utc(from).format('x')),
        // open: Number(logs[0].pricePerTokenNum) * (symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        open:
          Number(first[0].pricePerTokenNum) *
          (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        low:
          Number(sortedLogs[sortedLogs.length - 1].pricePerTokenNum) *
          (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        high:
          Number(sortedLogs[0].pricePerTokenNum) *
          (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        // close: Number(logs[logs.length - 1].pricePerTokenNum) * (symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        close:
          Number(last[0].pricePerTokenNum) * (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
        volume:
          logs.reduce((acc, current) => (acc += current.pricePerTokenNum * current.tokensNum), 0) *
          (_symbolInfo.currency_code === 'USD' ? bnbUsdRate : 1),
      };
      candles.push(candle);
    }
    from = from.add(Number(_resolution), 'minute');
  }

  return candles;
}
