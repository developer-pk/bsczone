import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types'
import { createChart } from 'lightweight-charts';
import './Chart.css';
import moment from 'moment';
import { useParams } from 'react-router';
import Datafeed from '../../helpers/datafeed';

// TODO: OnResize window

const Chart = ({ theme }) => {
  const chartRef = useRef(null);
  const [chartReady, setChartReady] = useState(false);

  const chart = useRef(null);

  const params = useParams();

  useEffect(() => {
    if (chart.current === null) {
      chart.current = new window.TradingView.widget({
         debug: true,
        fullscreen: true,
        symbol: `${params.pair}/${params.version ?? 'v1'}`,
        interval: '5',
        container_id: 'tv_chart_container',
        datafeed: Datafeed,
        library_path: '/public/charting_library/',
        locale: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_info'],
        enabled_features: ['pricescale_currency'],
        currency_codes: ['USD', 'BNB'],
        brokerConfig: {
          supportCryptoExchangeOrderTicket: true,
        },
        broker_config: {
          supportCryptoExchangeOrderTicket: true,
        },
        overrides: {
          'scalesProperties.scaleSeriesOnly ': true,
          'mainSeriesProperties.style': 8,
        },
        theme: theme === 'light' ? 'Light' : 'Dark',
      });

      chart.current.onChartReady(() => {
        setChartReady(true);
        // chart.current.activeChart().setChartType(8)
      });
    }
  }, []);

  useEffect(() => {
    if (chart.current !== null && chartReady) {
      chart.current.changeTheme(theme === 'light' ? 'Light' : 'Dark');
    }
  }, [theme]);

  useEffect(() => {
    if (chart.current !== null && chartReady) {
      let timeout = setTimeout(() => {
        chart.current.setSymbol(`${params.pair}/${params.version ?? 'v1'}`, '1H', console.log);
      }, 500);

      // console.log(chart.current.activeChart())
      // chart.current.activeChart().resetData()

      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.pair, params.version]);

  return (
    <div className="Chart">
      <div className="chart-container" id="tv_chart_container" ref={chartRef}></div>
    </div>
  );
};

Chart.propTypes = {};

export default Chart;
