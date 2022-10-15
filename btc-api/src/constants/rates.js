import ApilayerCreator from '../providers/Apilayer.js';
import BinanceCreator from '../providers/Binance.js';
import CoinbaseCreator from '../providers/Coinbase.js';
import ExchangeratesCreator from '../providers/Exchangerates.js';

export const DEFAULT_TO_CURRENCY = process.env.DEFAULT_TO_CURRENCY ?? 'UAH';
export const DEFAULT_FROM_CURRENCY = process.env.DEFAULT_FROM_CURRENCY ?? 'BTC';

export const RATE_PRECISION = Number(process.env.RATE_PRECISION ?? 5);

export const APILAYER_APIKEY =
  process.env.APILAYER_APIKEY ?? 'd6ItBPKVQ5SOSQidukDUyhAPUzn9xOZJ';
export const APILAYER_ENDPOINT =
  process.env.APILAYER_ENDPOINT ??
  'https://api.apilayer.com/exchangerates_data/convert';

export const EXCHANGERATES_ENDPOINT =
  process.env.EXCHANGERATES_ENDPOINT ?? 'https://api.exchangerate.host/latest';

export const COINBASE_ENDPOINT =
  process.env.COINBASE_ENDPOINT ?? 'https://api.coinbase.com/v2/exchange-rates';

export const BINANCE_ENDPOINT =
  process.env.BINANCE_ENDPOINT ?? 'https://api.binance.com/api/v3/ticker/price';

export const MAIN_RATE_PROVIDER_CREATOR =
  process.env.CRYPTO_CURRENCY_PROVIDER === 'binance'
    ? BinanceCreator
    : ApilayerCreator;

export const SECONDARY_RATE_PROVIDER_CREATORS = [
  ApilayerCreator,
  ExchangeratesCreator,
  CoinbaseCreator,
  BinanceCreator,
];

export const CACHE_TTL_SECONDS = Number(
  process.env.CACHE_TTL_SECONDS ?? 5 * 60
);
