/* cSpell:disable */
import type { Int } from '@w5s/core';
import { Currency } from './currency.js';
import { moneyFactory } from './moneyFactory.js';
import { CurrencyRegistry } from './currencyRegistry.js';

function registerAll() {
  const register = (...parameters: Parameters<typeof Currency>) => CurrencyRegistry.add(Currency(parameters[0]));

  register({
    code: 'USD',
    // precision: 2 as Int,
    name: 'US Dollar',
    namePlural: 'US dollars',
    // rounding: 0 as Int,
    symbol: '$',
    // symbolNative: '$',
  });

  register({
    code: 'CAD',
    // precision: 2 as Int,
    name: 'Canadian Dollar',
    namePlural: 'Canadian dollars',
    // rounding: 0 as Int,
    symbol: 'CA$',
    symbolNative: '$',
  });

  register({
    code: 'EUR',
    // precision: 2 as Int,
    name: 'Euro',
    namePlural: 'euros',
    // rounding: 0 as Int,
    symbol: '€',
    // symbolNative: '€',
  });

  register({
    code: 'AED',
    // precision: 2 as Int,
    name: 'United Arab Emirates Dirham',
    namePlural: 'UAE dirhams',
    // rounding: 0 as Int,
    symbol: 'AED',
    symbolNative: 'د.إ.‏',
  });

  register({
    code: 'AFN',
    precision: 0 as Int,
    name: 'Afghan Afghani',
    namePlural: 'Afghan Afghanis',
    // rounding: 0 as Int,
    symbol: 'Af',
    symbolNative: '؋',
  });

  register({
    code: 'ALL',
    precision: 0 as Int,
    name: 'Albanian Lek',
    namePlural: 'Albanian lekë',
    // rounding: 0 as Int,
    symbol: 'ALL',
    symbolNative: 'Lek',
  });

  register({
    code: 'AMD',
    precision: 0 as Int,
    name: 'Armenian Dram',
    namePlural: 'Armenian drams',
    // rounding: 0 as Int,
    symbol: 'AMD',
    symbolNative: 'դր.',
  });

  register({
    code: 'ARS',
    // precision: 2 as Int,
    name: 'Argentine Peso',
    namePlural: 'Argentine pesos',
    // rounding: 0 as Int,
    symbol: 'AR$',
    symbolNative: '$',
  });

  register({
    code: 'AUD',
    // precision: 2 as Int,
    name: 'Australian Dollar',
    namePlural: 'Australian dollars',
    // rounding: 0 as Int,
    symbol: 'AU$',
    symbolNative: '$',
  });

  register({
    code: 'AZN',
    // precision: 2 as Int,
    name: 'Azerbaijani Manat',
    namePlural: 'Azerbaijani manats',
    // rounding: 0 as Int,
    symbol: 'man.',
    symbolNative: 'ман.',
  });

  register({
    code: 'BAM',
    // precision: 2 as Int,
    name: 'Bosnia-Herzegovina Convertible Mark',
    namePlural: 'Bosnia-Herzegovina convertible marks',
    // rounding: 0 as Int,
    symbol: 'KM',
    // symbolNative: 'KM',
  });

  register({
    code: 'BDT',
    // precision: 2 as Int,
    name: 'Bangladeshi Taka',
    namePlural: 'Bangladeshi takas',
    // rounding: 0 as Int,
    symbol: 'Tk',
    symbolNative: '৳',
  });

  register({
    code: 'BGN',
    // precision: 2 as Int,
    name: 'Bulgarian Lev',
    namePlural: 'Bulgarian leva',
    // rounding: 0 as Int,
    symbol: 'BGN',
    symbolNative: 'лв.',
  });

  register({
    code: 'BHD',
    precision: 3 as Int,
    name: 'Bahraini Dinar',
    namePlural: 'Bahraini dinars',
    // rounding: 0 as Int,
    symbol: 'BD',
    symbolNative: 'د.ب.‏',
  });

  register({
    code: 'BIF',
    precision: 0 as Int,
    name: 'Burundian Franc',
    namePlural: 'Burundian francs',
    // rounding: 0 as Int,
    symbol: 'FBu',
    // symbolNative: 'FBu',
  });

  register({
    code: 'BND',
    // precision: 2 as Int,
    name: 'Brunei Dollar',
    namePlural: 'Brunei dollars',
    // rounding: 0 as Int,
    symbol: 'BN$',
    symbolNative: '$',
  });

  register({
    code: 'BOB',
    // precision: 2 as Int,
    name: 'Bolivian Boliviano',
    namePlural: 'Bolivian bolivianos',
    // rounding: 0 as Int,
    symbol: 'Bs',
    // symbolNative: 'Bs',
  });

  register({
    code: 'BRL',
    // precision: 2 as Int,
    name: 'Brazilian Real',
    namePlural: 'Brazilian reals',
    // rounding: 0 as Int,
    symbol: 'R$',
    // symbolNative: 'R$',
  });

  register({
    code: 'BWP',
    // precision: 2 as Int,
    name: 'Botswanan Pula',
    namePlural: 'Botswanan pulas',
    // rounding: 0 as Int,
    symbol: 'BWP',
    symbolNative: 'P',
  });

  register({
    code: 'BYN',
    // precision: 2 as Int,
    name: 'Belarusian Ruble',
    namePlural: 'Belarusian rubles',
    // rounding: 0 as Int,
    symbol: 'Br',
    symbolNative: 'руб.',
  });

  register({
    code: 'BZD',
    // precision: 2 as Int,
    name: 'Belize Dollar',
    namePlural: 'Belize dollars',
    // rounding: 0 as Int,
    symbol: 'BZ$',
    symbolNative: '$',
  });

  register({
    code: 'CDF',
    // precision: 2 as Int,
    name: 'Congolese Franc',
    namePlural: 'Congolese francs',
    // rounding: 0 as Int,
    symbol: 'CDF',
    symbolNative: 'FrCD',
  });

  register({
    code: 'CHF',
    // precision: 2 as Int,
    name: 'Swiss Franc',
    namePlural: 'Swiss francs',
    rounding: 0.05 as Int,
    symbol: 'CHF',
    // symbolNative: 'CHF',
  });

  register({
    code: 'CLP',
    precision: 0 as Int,
    name: 'Chilean Peso',
    namePlural: 'Chilean pesos',
    // rounding: 0 as Int,
    symbol: 'CL$',
    symbolNative: '$',
  });

  register({
    code: 'CNY',
    // precision: 2 as Int,
    name: 'Chinese Yuan',
    namePlural: 'Chinese yuan',
    // rounding: 0 as Int,
    symbol: 'CN¥',
    // symbolNative: 'CN¥',
  });

  register({
    code: 'COP',
    precision: 0 as Int,
    name: 'Colombian Peso',
    namePlural: 'Colombian pesos',
    // rounding: 0 as Int,
    symbol: 'CO$',
    symbolNative: '$',
  });

  register({
    code: 'CRC',
    precision: 0 as Int,
    name: 'Costa Rican Colón',
    namePlural: 'Costa Rican colóns',
    // rounding: 0 as Int,
    symbol: '₡',
    // symbolNative: '₡',
  });

  register({
    code: 'CVE',
    // precision: 2 as Int,
    name: 'Cape Verdean Escudo',
    namePlural: 'Cape Verdean escudos',
    // rounding: 0 as Int,
    symbol: 'CV$',
    // symbolNative: 'CV$',
  });

  register({
    code: 'CZK',
    // precision: 2 as Int,
    name: 'Czech Republic Koruna',
    namePlural: 'Czech Republic korunas',
    // rounding: 0 as Int,
    symbol: 'Kč',
    // symbolNative: 'Kč',
  });

  register({
    code: 'DJF',
    precision: 0 as Int,
    name: 'Djiboutian Franc',
    namePlural: 'Djiboutian francs',
    // rounding: 0 as Int,
    symbol: 'Fdj',
    // symbolNative: 'Fdj',
  });

  register({
    code: 'DKK',
    // precision: 2 as Int,
    name: 'Danish Krone',
    namePlural: 'Danish kroner',
    // rounding: 0 as Int,
    symbol: 'Dkr',
    symbolNative: 'kr',
  });

  register({
    code: 'DOP',
    // precision: 2 as Int,
    name: 'Dominican Peso',
    namePlural: 'Dominican pesos',
    // rounding: 0 as Int,
    symbol: 'RD$',
    // symbolNative: 'RD$',
  });

  register({
    code: 'DZD',
    // precision: 2 as Int,
    name: 'Algerian Dinar',
    namePlural: 'Algerian dinars',
    // rounding: 0 as Int,
    symbol: 'DA',
    symbolNative: 'د.ج.‏',
  });

  register({
    code: 'EEK',
    // precision: 2 as Int,
    name: 'Estonian Kroon',
    namePlural: 'Estonian kroons',
    // rounding: 0 as Int,
    symbol: 'Ekr',
    symbolNative: 'kr',
  });

  register({
    code: 'EGP',
    // precision: 2 as Int,
    name: 'Egyptian Pound',
    namePlural: 'Egyptian pounds',
    // rounding: 0 as Int,
    symbol: 'EGP',
    symbolNative: 'ج.م.‏',
  });

  register({
    code: 'ERN',
    // precision: 2 as Int,
    name: 'Eritrean Nakfa',
    namePlural: 'Eritrean nakfas',
    // rounding: 0 as Int,
    symbol: 'Nfk',
    // symbolNative: 'Nfk',
  });

  register({
    code: 'ETB',
    // precision: 2 as Int,
    name: 'Ethiopian Birr',
    namePlural: 'Ethiopian birrs',
    // rounding: 0 as Int,
    symbol: 'Br',
    // symbolNative: 'Br',
  });

  register({
    code: 'GBP',
    // precision: 2 as Int,
    name: 'British Pound Sterling',
    namePlural: 'British pounds sterling',
    // rounding: 0 as Int,
    symbol: '£',
    // symbolNative: '£',
  });

  register({
    code: 'GEL',
    // precision: 2 as Int,
    name: 'Georgian Lari',
    namePlural: 'Georgian laris',
    // rounding: 0 as Int,
    symbol: 'GEL',
    // symbolNative: 'GEL',
  });

  register({
    code: 'GHS',
    // precision: 2 as Int,
    name: 'Ghanaian Cedi',
    namePlural: 'Ghanaian cedis',
    // rounding: 0 as Int,
    symbol: 'GH₵',
    // symbolNative: 'GH₵',
  });

  register({
    code: 'GNF',
    precision: 0 as Int,
    name: 'Guinean Franc',
    namePlural: 'Guinean francs',
    // rounding: 0 as Int,
    symbol: 'FG',
    // symbolNative: 'FG',
  });

  register({
    code: 'GTQ',
    // precision: 2 as Int,
    name: 'Guatemalan Quetzal',
    namePlural: 'Guatemalan quetzals',
    // rounding: 0 as Int,
    symbol: 'GTQ',
    symbolNative: 'Q',
  });

  register({
    code: 'HKD',
    // precision: 2 as Int,
    name: 'Hong Kong Dollar',
    namePlural: 'Hong Kong dollars',
    // rounding: 0 as Int,
    symbol: 'HK$',
    symbolNative: '$',
  });

  register({
    code: 'HNL',
    // precision: 2 as Int,
    name: 'Honduran Lempira',
    namePlural: 'Honduran lempiras',
    // rounding: 0 as Int,
    symbol: 'HNL',
    symbolNative: 'L',
  });

  register({
    code: 'HRK',
    // precision: 2 as Int,
    name: 'Croatian Kuna',
    namePlural: 'Croatian kunas',
    // rounding: 0 as Int,
    symbol: 'kn',
    // symbolNative: 'kn',
  });

  register({
    code: 'HUF',
    precision: 0 as Int,
    name: 'Hungarian Forint',
    namePlural: 'Hungarian forints',
    // rounding: 0 as Int,
    symbol: 'Ft',
    // symbolNative: 'Ft',
  });

  register({
    code: 'IDR',
    precision: 0 as Int,
    name: 'Indonesian Rupiah',
    namePlural: 'Indonesian rupiahs',
    // rounding: 0 as Int,
    symbol: 'Rp',
    // symbolNative: 'Rp',
  });

  register({
    code: 'ILS',
    // precision: 2 as Int,
    name: 'Israeli New Sheqel',
    namePlural: 'Israeli new sheqels',
    // rounding: 0 as Int,
    symbol: '₪',
    // symbolNative: '₪',
  });

  register({
    code: 'INR',
    // precision: 2 as Int,
    name: 'Indian Rupee',
    namePlural: 'Indian rupees',
    // rounding: 0 as Int,
    symbol: 'Rs',
    symbolNative: 'টকা',
  });

  register({
    code: 'IQD',
    precision: 0 as Int,
    name: 'Iraqi Dinar',
    namePlural: 'Iraqi dinars',
    // rounding: 0 as Int,
    symbol: 'IQD',
    symbolNative: 'د.ع.‏',
  });

  register({
    code: 'IRR',
    precision: 0 as Int,
    name: 'Iranian Rial',
    namePlural: 'Iranian rials',
    // rounding: 0 as Int,
    symbol: 'IRR',
    symbolNative: '﷼',
  });

  register({
    code: 'ISK',
    precision: 0 as Int,
    name: 'Icelandic Króna',
    namePlural: 'Icelandic krónur',
    // rounding: 0 as Int,
    symbol: 'Ikr',
    symbolNative: 'kr',
  });

  register({
    code: 'JMD',
    // precision: 2 as Int,
    name: 'Jamaican Dollar',
    namePlural: 'Jamaican dollars',
    // rounding: 0 as Int,
    symbol: 'J$',
    symbolNative: '$',
  });

  register({
    code: 'JOD',
    precision: 3 as Int,
    name: 'Jordanian Dinar',
    namePlural: 'Jordanian dinars',
    // rounding: 0 as Int,
    symbol: 'JD',
    symbolNative: 'د.أ.‏',
  });

  register({
    code: 'JPY',
    precision: 0 as Int,
    name: 'Japanese Yen',
    namePlural: 'Japanese yen',
    // rounding: 0 as Int,
    symbol: '¥',
    symbolNative: '￥',
  });

  register({
    code: 'KES',
    // precision: 2 as Int,
    name: 'Kenyan Shilling',
    namePlural: 'Kenyan shillings',
    // rounding: 0 as Int,
    symbol: 'Ksh',
    // symbolNative: 'Ksh',
  });

  register({
    code: 'KHR',
    // precision: 2 as Int,
    name: 'Cambodian Riel',
    namePlural: 'Cambodian riels',
    // rounding: 0 as Int,
    symbol: 'KHR',
    symbolNative: '៛',
  });

  register({
    code: 'KMF',
    precision: 0 as Int,
    name: 'Comorian Franc',
    namePlural: 'Comorian francs',
    // rounding: 0 as Int,
    symbol: 'CF',
    symbolNative: 'FC',
  });

  register({
    code: 'KRW',
    precision: 0 as Int,
    name: 'South Korean Won',
    namePlural: 'South Korean won',
    // rounding: 0 as Int,
    symbol: '₩',
    // symbolNative: '₩',
  });

  register({
    code: 'KWD',
    precision: 3 as Int,
    name: 'Kuwaiti Dinar',
    namePlural: 'Kuwaiti dinars',
    // rounding: 0 as Int,
    symbol: 'KD',
    symbolNative: 'د.ك.‏',
  });

  register({
    code: 'KZT',
    // precision: 2 as Int,
    name: 'Kazakhstani Tenge',
    namePlural: 'Kazakhstani tenges',
    // rounding: 0 as Int,
    symbol: 'KZT',
    symbolNative: 'тңг.',
  });

  register({
    code: 'LBP',
    precision: 0 as Int,
    name: 'Lebanese Pound',
    namePlural: 'Lebanese pounds',
    // rounding: 0 as Int,
    symbol: 'LB£',
    symbolNative: 'ل.ل.‏',
  });

  register({
    code: 'LKR',
    // precision: 2 as Int,
    name: 'Sri Lankan Rupee',
    namePlural: 'Sri Lankan rupees',
    // rounding: 0 as Int,
    symbol: 'SLRs',
    symbolNative: 'SL Re',
  });

  register({
    code: 'LTL',
    // precision: 2 as Int,
    name: 'Lithuanian Litas',
    namePlural: 'Lithuanian litai',
    // rounding: 0 as Int,
    symbol: 'Lt',
    // symbolNative: 'Lt',
  });

  register({
    code: 'LVL',
    // precision: 2 as Int,
    name: 'Latvian Lats',
    namePlural: 'Latvian lati',
    // rounding: 0 as Int,
    symbol: 'Ls',
    // symbolNative: 'Ls',
  });

  register({
    code: 'LYD',
    precision: 3 as Int,
    name: 'Libyan Dinar',
    namePlural: 'Libyan dinars',
    // rounding: 0 as Int,
    symbol: 'LD',
    symbolNative: 'د.ل.‏',
  });

  register({
    code: 'MAD',
    // precision: 2 as Int,
    name: 'Moroccan Dirham',
    namePlural: 'Moroccan dirhams',
    // rounding: 0 as Int,
    symbol: 'MAD',
    symbolNative: 'د.م.‏',
  });

  register({
    code: 'MDL',
    // precision: 2 as Int,
    name: 'Moldovan Leu',
    namePlural: 'Moldovan lei',
    // rounding: 0 as Int,
    symbol: 'MDL',
    // symbolNative: 'MDL',
  });

  register({
    code: 'MGA',
    precision: 0 as Int,
    name: 'Malagasy Ariary',
    namePlural: 'Malagasy Ariaries',
    // rounding: 0 as Int,
    symbol: 'MGA',
    // symbolNative: 'MGA',
  });

  register({
    code: 'MKD',
    // precision: 2 as Int,
    name: 'Macedonian Denar',
    namePlural: 'Macedonian denari',
    // rounding: 0 as Int,
    symbol: 'MKD',
    // symbolNative: 'MKD',
  });

  register({
    code: 'MMK',
    precision: 0 as Int,
    name: 'Myanma Kyat',
    namePlural: 'Myanma kyats',
    // rounding: 0 as Int,
    symbol: 'MMK',
    symbolNative: 'K',
  });

  register({
    code: 'MOP',
    // precision: 2 as Int,
    name: 'Macanese Pataca',
    namePlural: 'Macanese patacas',
    // rounding: 0 as Int,
    symbol: 'MOP$',
    // symbolNative: 'MOP$',
  });

  register({
    code: 'MUR',
    precision: 0 as Int,
    name: 'Mauritian Rupee',
    namePlural: 'Mauritian rupees',
    // rounding: 0 as Int,
    symbol: 'MURs',
    // symbolNative: 'MURs',
  });

  register({
    code: 'MXN',
    // precision: 2 as Int,
    name: 'Mexican Peso',
    namePlural: 'Mexican pesos',
    // rounding: 0 as Int,
    symbol: 'MX$',
    symbolNative: '$',
  });

  register({
    code: 'MYR',
    // precision: 2 as Int,
    name: 'Malaysian Ringgit',
    namePlural: 'Malaysian ringgits',
    // rounding: 0 as Int,
    symbol: 'RM',
    // symbolNative: 'RM',
  });

  register({
    code: 'MZN',
    // precision: 2 as Int,
    name: 'Mozambican Metical',
    namePlural: 'Mozambican meticals',
    // rounding: 0 as Int,
    symbol: 'MTn',
    // symbolNative: 'MTn',
  });

  register({
    code: 'NAD',
    // precision: 2 as Int,
    name: 'Namibian Dollar',
    namePlural: 'Namibian dollars',
    // rounding: 0 as Int,
    symbol: 'N$',
    // symbolNative: 'N$',
  });

  register({
    code: 'NGN',
    // precision: 2 as Int,
    name: 'Nigerian Naira',
    namePlural: 'Nigerian nairas',
    // rounding: 0 as Int,
    symbol: '₦',
    // symbolNative: '₦',
  });

  register({
    code: 'NIO',
    // precision: 2 as Int,
    name: 'Nicaraguan Córdoba',
    namePlural: 'Nicaraguan córdobas',
    // rounding: 0 as Int,
    symbol: 'C$',
    // symbolNative: 'C$',
  });

  register({
    code: 'NOK',
    // precision: 2 as Int,
    name: 'Norwegian Krone',
    namePlural: 'Norwegian kroner',
    // rounding: 0 as Int,
    symbol: 'Nkr',
    symbolNative: 'kr',
  });

  register({
    code: 'NPR',
    // precision: 2 as Int,
    name: 'Nepalese Rupee',
    namePlural: 'Nepalese rupees',
    // rounding: 0 as Int,
    symbol: 'NPRs',
    symbolNative: 'नेरू',
  });

  register({
    code: 'NZD',
    // precision: 2 as Int,
    name: 'New Zealand Dollar',
    namePlural: 'New Zealand dollars',
    // rounding: 0 as Int,
    symbol: 'NZ$',
    symbolNative: '$',
  });

  register({
    code: 'OMR',
    precision: 3 as Int,
    name: 'Omani Rial',
    namePlural: 'Omani rials',
    // rounding: 0 as Int,
    symbol: 'OMR',
    symbolNative: 'ر.ع.‏',
  });

  register({
    code: 'PAB',
    // precision: 2 as Int,
    name: 'Panamanian Balboa',
    namePlural: 'Panamanian balboas',
    // rounding: 0 as Int,
    symbol: 'B/.',
    // symbolNative: 'B/.',
  });

  register({
    code: 'PEN',
    // precision: 2 as Int,
    name: 'Peruvian Nuevo Sol',
    namePlural: 'Peruvian nuevos soles',
    // rounding: 0 as Int,
    symbol: 'S/.',
    // symbolNative: 'S/.',
  });

  register({
    code: 'PHP',
    // precision: 2 as Int,
    name: 'Philippine Peso',
    namePlural: 'Philippine pesos',
    // rounding: 0 as Int,
    symbol: '₱',
    // symbolNative: '₱',
  });

  register({
    code: 'PKR',
    precision: 0 as Int,
    name: 'Pakistani Rupee',
    namePlural: 'Pakistani rupees',
    // rounding: 0 as Int,
    symbol: 'PKRs',
    symbolNative: '₨',
  });

  register({
    code: 'PLN',
    // precision: 2 as Int,
    name: 'Polish Zloty',
    namePlural: 'Polish zlotys',
    // rounding: 0 as Int,
    symbol: 'zł',
    // symbolNative: 'zł',
  });

  register({
    code: 'PYG',
    precision: 0 as Int,
    name: 'Paraguayan Guarani',
    namePlural: 'Paraguayan guaranis',
    // rounding: 0 as Int,
    symbol: '₲',
    // symbolNative: '₲',
  });

  register({
    code: 'QAR',
    // precision: 2 as Int,
    name: 'Qatari Rial',
    namePlural: 'Qatari rials',
    // rounding: 0 as Int,
    symbol: 'QR',
    symbolNative: 'ر.ق.‏',
  });

  register({
    code: 'RON',
    // precision: 2 as Int,
    name: 'Romanian Leu',
    namePlural: 'Romanian lei',
    // rounding: 0 as Int,
    symbol: 'RON',
    // symbolNative: 'RON',
  });

  register({
    code: 'RSD',
    precision: 0 as Int,
    name: 'Serbian Dinar',
    namePlural: 'Serbian dinars',
    // rounding: 0 as Int,
    symbol: 'din.',
    symbolNative: 'дин.',
  });

  register({
    code: 'RUB',
    // precision: 2 as Int,
    name: 'Russian Ruble',
    namePlural: 'Russian rubles',
    // rounding: 0 as Int,
    symbol: 'RUB',
    symbolNative: '₽.',
  });

  register({
    code: 'RWF',
    precision: 0 as Int,
    name: 'Rwandan Franc',
    namePlural: 'Rwandan francs',
    // rounding: 0 as Int,
    symbol: 'RWF',
    symbolNative: 'FR',
  });

  register({
    code: 'SAR',
    // precision: 2 as Int,
    name: 'Saudi Riyal',
    namePlural: 'Saudi riyals',
    // rounding: 0 as Int,
    symbol: 'SR',
    symbolNative: 'ر.س.‏',
  });

  register({
    code: 'SDG',
    // precision: 2 as Int,
    name: 'Sudanese Pound',
    namePlural: 'Sudanese pounds',
    // rounding: 0 as Int,
    symbol: 'SDG',
    // symbolNative: 'SDG',
  });

  register({
    code: 'SEK',
    // precision: 2 as Int,
    name: 'Swedish Krona',
    namePlural: 'Swedish kronor',
    // rounding: 0 as Int,
    symbol: 'Skr',
    symbolNative: 'kr',
  });

  register({
    code: 'SGD',
    // precision: 2 as Int,
    name: 'Singapore Dollar',
    namePlural: 'Singapore dollars',
    // rounding: 0 as Int,
    symbol: 'S$',
    symbolNative: '$',
  });

  register({
    code: 'SOS',
    precision: 0 as Int,
    name: 'Somali Shilling',
    namePlural: 'Somali shillings',
    // rounding: 0 as Int,
    symbol: 'Ssh',
    // symbolNative: 'Ssh',
  });

  register({
    code: 'SYP',
    precision: 0 as Int,
    name: 'Syrian Pound',
    namePlural: 'Syrian pounds',
    // rounding: 0 as Int,
    symbol: 'SY£',
    symbolNative: 'ل.س.‏',
  });

  register({
    code: 'THB',
    // precision: 2 as Int,
    name: 'Thai Baht',
    namePlural: 'Thai baht',
    // rounding: 0 as Int,
    symbol: '฿',
    // symbolNative: '฿',
  });

  register({
    code: 'TND',
    precision: 3 as Int,
    name: 'Tunisian Dinar',
    namePlural: 'Tunisian dinars',
    // rounding: 0 as Int,
    symbol: 'DT',
    symbolNative: 'د.ت.‏',
  });

  register({
    code: 'TOP',
    // precision: 2 as Int,
    name: 'Tongan Paʻanga',
    namePlural: 'Tongan paʻanga',
    // rounding: 0 as Int,
    symbol: 'T$',
    // symbolNative: 'T$',
  });

  register({
    code: 'TRY',
    // precision: 2 as Int,
    name: 'Turkish Lira',
    namePlural: 'Turkish Lira',
    // rounding: 0 as Int,
    symbol: 'TL',
    // symbolNative: 'TL',
  });

  register({
    code: 'TTD',
    // precision: 2 as Int,
    name: 'Trinidad and Tobago Dollar',
    namePlural: 'Trinidad and Tobago dollars',
    // rounding: 0 as Int,
    symbol: 'TT$',
    symbolNative: '$',
  });

  register({
    code: 'TWD',
    // precision: 2 as Int,
    name: 'New Taiwan Dollar',
    namePlural: 'New Taiwan dollars',
    // rounding: 0 as Int,
    symbol: 'NT$',
    // symbolNative: 'NT$',
  });

  register({
    code: 'TZS',
    precision: 0 as Int,
    name: 'Tanzanian Shilling',
    namePlural: 'Tanzanian shillings',
    // rounding: 0 as Int,
    symbol: 'TSh',
    // symbolNative: 'TSh',
  });

  register({
    code: 'UAH',
    // precision: 2 as Int,
    name: 'Ukrainian Hryvnia',
    namePlural: 'Ukrainian hryvnias',
    // rounding: 0 as Int,
    symbol: '₴',
    // symbolNative: '₴',
  });

  register({
    code: 'UGX',
    precision: 0 as Int,
    name: 'Ugandan Shilling',
    namePlural: 'Ugandan shillings',
    // rounding: 0 as Int,
    symbol: 'USh',
    // symbolNative: 'USh',
  });

  register({
    code: 'UYU',
    // precision: 2 as Int,
    name: 'Uruguayan Peso',
    namePlural: 'Uruguayan pesos',
    // rounding: 0 as Int,
    symbol: '$U',
    symbolNative: '$',
  });

  register({
    code: 'UZS',
    precision: 0 as Int,
    name: 'Uzbekistan Som',
    namePlural: 'Uzbekistan som',
    // rounding: 0 as Int,
    symbol: 'UZS',
    // symbolNative: 'UZS',
  });

  register({
    code: 'VEF',
    // precision: 2 as Int,
    name: 'Venezuelan Bolívar',
    namePlural: 'Venezuelan bolívars',
    // rounding: 0 as Int,
    symbol: 'Bs.F.',
    // symbolNative: 'Bs.F.',
  });

  register({
    code: 'VND',
    precision: 0 as Int,
    name: 'Vietnamese Dong',
    namePlural: 'Vietnamese dong',
    // rounding: 0 as Int,
    symbol: '₫',
    // symbolNative: '₫',
  });

  register({
    code: 'XAF',
    precision: 0 as Int,
    name: 'CFA Franc BEAC',
    namePlural: 'CFA francs BEAC',
    // rounding: 0 as Int,
    symbol: 'FCFA',
    // symbolNative: 'FCFA',
  });

  register({
    code: 'XOF',
    precision: 0 as Int,
    name: 'CFA Franc BCEAO',
    namePlural: 'CFA francs BCEAO',
    // rounding: 0 as Int,
    symbol: 'CFA',
    // symbolNative: 'CFA',
  });

  register({
    code: 'YER',
    precision: 0 as Int,
    name: 'Yemeni Rial',
    namePlural: 'Yemeni rials',
    // rounding: 0 as Int,
    symbol: 'YR',
    symbolNative: 'ر.ي.‏',
  });

  register({
    code: 'ZAR',
    // precision: 2 as Int,
    name: 'South African Rand',
    namePlural: 'South African rand',
    // rounding: 0 as Int,
    symbol: 'R',
    // symbolNative: 'R',
  });

  register({
    code: 'ZMK',
    precision: 0 as Int,
    name: 'Zambian Kwacha',
    namePlural: 'Zambian kwachas',
    // rounding: 0 as Int,
    symbol: 'ZK',
    // symbolNative: 'ZK',
  });

  register({
    code: 'ZWL',
    precision: 0 as Int,
    name: 'Zimbabwean Dollar',
    namePlural: 'Zimbabwean Dollar',
    // rounding: 0 as Int,
    symbol: 'ZWL$',
    // symbolNative: 'ZWL$',
  });
}
registerAll();
/**
 * US Dollar money factory
 *
 * @example
 * ```typescript
 * const money = USD('1.25');// Money({ currency: Currency({ code: 'USD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const USD = moneyFactory('USD');
/**
 * Canadian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = CAD('1.25');// Money({ currency: Currency({ code: 'CAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CAD = moneyFactory('CAD');
/**
 * Euro money factory
 *
 * @example
 * ```typescript
 * const money = EUR('1.25');// Money({ currency: Currency({ code: 'EUR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EUR = moneyFactory('EUR');
/**
 * United Arab Emirates Dirham money factory
 *
 * @example
 * ```typescript
 * const money = AED('1.25');// Money({ currency: Currency({ code: 'AED' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AED = moneyFactory('AED');
/**
 * Afghan Afghani money factory
 *
 * @example
 * ```typescript
 * const money = AFN('1.25');// Money({ currency: Currency({ code: 'AFN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AFN = moneyFactory('AFN');
/**
 * Albanian Lek money factory
 *
 * @example
 * ```typescript
 * const money = ALL('1.25');// Money({ currency: Currency({ code: 'ALL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ALL = moneyFactory('ALL');
/**
 * Armenian Dram money factory
 *
 * @example
 * ```typescript
 * const money = AMD('1.25');// Money({ currency: Currency({ code: 'AMD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AMD = moneyFactory('AMD');
/**
 * Argentine Peso money factory
 *
 * @example
 * ```typescript
 * const money = ARS('1.25');// Money({ currency: Currency({ code: 'ARS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ARS = moneyFactory('ARS');
/**
 * Australian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = AUD('1.25');// Money({ currency: Currency({ code: 'AUD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AUD = moneyFactory('AUD');
/**
 * Azerbaijani Manat money factory
 *
 * @example
 * ```typescript
 * const money = AZN('1.25');// Money({ currency: Currency({ code: 'AZN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AZN = moneyFactory('AZN');
/**
 * Bosnia-Herzegovina Convertible Mark money factory
 *
 * @example
 * ```typescript
 * const money = BAM('1.25');// Money({ currency: Currency({ code: 'BAM' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BAM = moneyFactory('BAM');
/**
 * Bangladeshi Taka money factory
 *
 * @example
 * ```typescript
 * const money = BDT('1.25');// Money({ currency: Currency({ code: 'BDT' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BDT = moneyFactory('BDT');
/**
 * Bulgarian Lev money factory
 *
 * @example
 * ```typescript
 * const money = BGN('1.25');// Money({ currency: Currency({ code: 'BGN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BGN = moneyFactory('BGN');
/**
 * Bahraini Dinar money factory
 *
 * @example
 * ```typescript
 * const money = BHD('1.25');// Money({ currency: Currency({ code: 'BHD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BHD = moneyFactory('BHD');
/**
 * Burundian Franc money factory
 *
 * @example
 * ```typescript
 * const money = BIF('1.25');// Money({ currency: Currency({ code: 'BIF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BIF = moneyFactory('BIF');
/**
 * Brunei Dollar money factory
 *
 * @example
 * ```typescript
 * const money = BND('1.25');// Money({ currency: Currency({ code: 'BND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BND = moneyFactory('BND');
/**
 * Bolivian Boliviano money factory
 *
 * @example
 * ```typescript
 * const money = BOB('1.25');// Money({ currency: Currency({ code: 'BOB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BOB = moneyFactory('BOB');
/**
 * Brazilian Real money factory
 *
 * @example
 * ```typescript
 * const money = BRL('1.25');// Money({ currency: Currency({ code: 'BRL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BRL = moneyFactory('BRL');
/**
 * Botswanan Pula money factory
 *
 * @example
 * ```typescript
 * const money = BWP('1.25');// Money({ currency: Currency({ code: 'BWP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BWP = moneyFactory('BWP');
/**
 * Belarusian Ruble money factory
 *
 * @example
 * ```typescript
 * const money = BYN('1.25');// Money({ currency: Currency({ code: 'BYN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BYN = moneyFactory('BYN');
/**
 * Belize Dollar money factory
 *
 * @example
 * ```typescript
 * const money = BZD('1.25');// Money({ currency: Currency({ code: 'BZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BZD = moneyFactory('BZD');
/**
 * Congolese Franc money factory
 *
 * @example
 * ```typescript
 * const money = CDF('1.25');// Money({ currency: Currency({ code: 'CDF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CDF = moneyFactory('CDF');
/**
 * Swiss Franc money factory
 *
 * @example
 * ```typescript
 * const money = CHF('1.25');// Money({ currency: Currency({ code: 'CHF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CHF = moneyFactory('CHF');
/**
 * Chilean Peso money factory
 *
 * @example
 * ```typescript
 * const money = CLP('1.25');// Money({ currency: Currency({ code: 'CLP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CLP = moneyFactory('CLP');
/**
 * Chinese Yuan money factory
 *
 * @example
 * ```typescript
 * const money = CNY('1.25');// Money({ currency: Currency({ code: 'CNY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CNY = moneyFactory('CNY');
/**
 * Colombian Peso money factory
 *
 * @example
 * ```typescript
 * const money = COP('1.25');// Money({ currency: Currency({ code: 'COP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const COP = moneyFactory('COP');
/**
 * Costa Rican Colón money factory
 *
 * @example
 * ```typescript
 * const money = CRC('1.25');// Money({ currency: Currency({ code: 'CRC' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CRC = moneyFactory('CRC');
/**
 * Cape Verdean Escudo money factory
 *
 * @example
 * ```typescript
 * const money = CVE('1.25');// Money({ currency: Currency({ code: 'CVE' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CVE = moneyFactory('CVE');
/**
 * Czech Republic Koruna money factory
 *
 * @example
 * ```typescript
 * const money = CZK('1.25');// Money({ currency: Currency({ code: 'CZK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CZK = moneyFactory('CZK');
/**
 * Djiboutian Franc money factory
 *
 * @example
 * ```typescript
 * const money = DJF('1.25');// Money({ currency: Currency({ code: 'DJF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DJF = moneyFactory('DJF');
/**
 * Danish Krone money factory
 *
 * @example
 * ```typescript
 * const money = DKK('1.25');// Money({ currency: Currency({ code: 'DKK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DKK = moneyFactory('DKK');
/**
 * Dominican Peso money factory
 *
 * @example
 * ```typescript
 * const money = DOP('1.25');// Money({ currency: Currency({ code: 'DOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DOP = moneyFactory('DOP');
/**
 * Algerian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = DZD('1.25');// Money({ currency: Currency({ code: 'DZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DZD = moneyFactory('DZD');
/**
 * Estonian Kroon money factory
 *
 * @example
 * ```typescript
 * const money = EEK('1.25');// Money({ currency: Currency({ code: 'EEK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EEK = moneyFactory('EEK');
/**
 * Egyptian Pound money factory
 *
 * @example
 * ```typescript
 * const money = EGP('1.25');// Money({ currency: Currency({ code: 'EGP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EGP = moneyFactory('EGP');
/**
 * Eritrean Nakfa money factory
 *
 * @example
 * ```typescript
 * const money = ERN('1.25');// Money({ currency: Currency({ code: 'ERN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ERN = moneyFactory('ERN');
/**
 * Ethiopian Birr money factory
 *
 * @example
 * ```typescript
 * const money = ETB('1.25');// Money({ currency: Currency({ code: 'ETB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ETB = moneyFactory('ETB');
/**
 * British Pound Sterling money factory
 *
 * @example
 * ```typescript
 * const money = GBP('1.25');// Money({ currency: Currency({ code: 'GBP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GBP = moneyFactory('GBP');
/**
 * Georgian Lari money factory
 *
 * @example
 * ```typescript
 * const money = GEL('1.25');// Money({ currency: Currency({ code: 'GEL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GEL = moneyFactory('GEL');
/**
 * Ghanaian Cedi money factory
 *
 * @example
 * ```typescript
 * const money = GHS('1.25');// Money({ currency: Currency({ code: 'GHS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GHS = moneyFactory('GHS');
/**
 * Guinean Franc money factory
 *
 * @example
 * ```typescript
 * const money = GNF('1.25');// Money({ currency: Currency({ code: 'GNF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GNF = moneyFactory('GNF');
/**
 * Guatemalan Quetzal money factory
 *
 * @example
 * ```typescript
 * const money = GTQ('1.25');// Money({ currency: Currency({ code: 'GTQ' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GTQ = moneyFactory('GTQ');
/**
 * Hong Kong Dollar money factory
 *
 * @example
 * ```typescript
 * const money = HKD('1.25');// Money({ currency: Currency({ code: 'HKD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HKD = moneyFactory('HKD');
/**
 * Honduran Lempira money factory
 *
 * @example
 * ```typescript
 * const money = HNL('1.25');// Money({ currency: Currency({ code: 'HNL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HNL = moneyFactory('HNL');
/**
 * Croatian Kuna money factory
 *
 * @example
 * ```typescript
 * const money = HRK('1.25');// Money({ currency: Currency({ code: 'HRK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HRK = moneyFactory('HRK');
/**
 * Hungarian Forint money factory
 *
 * @example
 * ```typescript
 * const money = HUF('1.25');// Money({ currency: Currency({ code: 'HUF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HUF = moneyFactory('HUF');
/**
 * Indonesian Rupiah money factory
 *
 * @example
 * ```typescript
 * const money = IDR('1.25');// Money({ currency: Currency({ code: 'IDR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IDR = moneyFactory('IDR');
/**
 * Israeli New Sheqel money factory
 *
 * @example
 * ```typescript
 * const money = ILS('1.25');// Money({ currency: Currency({ code: 'ILS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ILS = moneyFactory('ILS');
/**
 * Indian Rupee money factory
 *
 * @example
 * ```typescript
 * const money = INR('1.25');// Money({ currency: Currency({ code: 'INR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const INR = moneyFactory('INR');
/**
 * Iraqi Dinar money factory
 *
 * @example
 * ```typescript
 * const money = IQD('1.25');// Money({ currency: Currency({ code: 'IQD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IQD = moneyFactory('IQD');
/**
 * Iranian Rial money factory
 *
 * @example
 * ```typescript
 * const money = IRR('1.25');// Money({ currency: Currency({ code: 'IRR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IRR = moneyFactory('IRR');
/**
 * Icelandic Króna money factory
 *
 * @example
 * ```typescript
 * const money = ISK('1.25');// Money({ currency: Currency({ code: 'ISK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ISK = moneyFactory('ISK');
/**
 * Jamaican Dollar money factory
 *
 * @example
 * ```typescript
 * const money = JMD('1.25');// Money({ currency: Currency({ code: 'JMD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JMD = moneyFactory('JMD');
/**
 * Jordanian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = JOD('1.25');// Money({ currency: Currency({ code: 'JOD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JOD = moneyFactory('JOD');
/**
 * Japanese Yen money factory
 *
 * @example
 * ```typescript
 * const money = JPY('1.25');// Money({ currency: Currency({ code: 'JPY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JPY = moneyFactory('JPY');
/**
 * Kenyan Shilling money factory
 *
 * @example
 * ```typescript
 * const money = KES('1.25');// Money({ currency: Currency({ code: 'KES' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KES = moneyFactory('KES');
/**
 * Cambodian Riel money factory
 *
 * @example
 * ```typescript
 * const money = KHR('1.25');// Money({ currency: Currency({ code: 'KHR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KHR = moneyFactory('KHR');
/**
 * Comorian Franc money factory
 *
 * @example
 * ```typescript
 * const money = KMF('1.25');// Money({ currency: Currency({ code: 'KMF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KMF = moneyFactory('KMF');
/**
 * South Korean Won money factory
 *
 * @example
 * ```typescript
 * const money = KRW('1.25');// Money({ currency: Currency({ code: 'KRW' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KRW = moneyFactory('KRW');
/**
 * Kuwaiti Dinar money factory
 *
 * @example
 * ```typescript
 * const money = KWD('1.25');// Money({ currency: Currency({ code: 'KWD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KWD = moneyFactory('KWD');
/**
 * Kazakhstani Tenge money factory
 *
 * @example
 * ```typescript
 * const money = KZT('1.25');// Money({ currency: Currency({ code: 'KZT' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KZT = moneyFactory('KZT');
/**
 * Lebanese Pound money factory
 *
 * @example
 * ```typescript
 * const money = LBP('1.25');// Money({ currency: Currency({ code: 'LBP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LBP = moneyFactory('LBP');
/**
 * Sri Lankan Rupee money factory
 *
 * @example
 * ```typescript
 * const money = LKR('1.25');// Money({ currency: Currency({ code: 'LKR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LKR = moneyFactory('LKR');
/**
 * Lithuanian Litas money factory
 *
 * @example
 * ```typescript
 * const money = LTL('1.25');// Money({ currency: Currency({ code: 'LTL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LTL = moneyFactory('LTL');
/**
 * Latvian Lats money factory
 *
 * @example
 * ```typescript
 * const money = LVL('1.25');// Money({ currency: Currency({ code: 'LVL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LVL = moneyFactory('LVL');
/**
 * Libyan Dinar money factory
 *
 * @example
 * ```typescript
 * const money = LYD('1.25');// Money({ currency: Currency({ code: 'LYD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LYD = moneyFactory('LYD');
/**
 * Moroccan Dirham money factory
 *
 * @example
 * ```typescript
 * const money = MAD('1.25');// Money({ currency: Currency({ code: 'MAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MAD = moneyFactory('MAD');
/**
 * Moldovan Leu money factory
 *
 * @example
 * ```typescript
 * const money = MDL('1.25');// Money({ currency: Currency({ code: 'MDL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MDL = moneyFactory('MDL');
/**
 * Malagasy Ariary money factory
 *
 * @example
 * ```typescript
 * const money = MGA('1.25');// Money({ currency: Currency({ code: 'MGA' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MGA = moneyFactory('MGA');
/**
 * Macedonian Denar money factory
 *
 * @example
 * ```typescript
 * const money = MKD('1.25');// Money({ currency: Currency({ code: 'MKD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MKD = moneyFactory('MKD');
/**
 * Myanma Kyat money factory
 *
 * @example
 * ```typescript
 * const money = MMK('1.25');// Money({ currency: Currency({ code: 'MMK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MMK = moneyFactory('MMK');
/**
 * Macanese Pataca money factory
 *
 * @example
 * ```typescript
 * const money = MOP('1.25');// Money({ currency: Currency({ code: 'MOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MOP = moneyFactory('MOP');
/**
 * Mauritian Rupee money factory
 *
 * @example
 * ```typescript
 * const money = MUR('1.25');// Money({ currency: Currency({ code: 'MUR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MUR = moneyFactory('MUR');
/**
 * Mexican Peso money factory
 *
 * @example
 * ```typescript
 * const money = MXN('1.25');// Money({ currency: Currency({ code: 'MXN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MXN = moneyFactory('MXN');
/**
 * Malaysian Ringgit money factory
 *
 * @example
 * ```typescript
 * const money = MYR('1.25');// Money({ currency: Currency({ code: 'MYR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MYR = moneyFactory('MYR');
/**
 * Mozambican Metical money factory
 *
 * @example
 * ```typescript
 * const money = MZN('1.25');// Money({ currency: Currency({ code: 'MZN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MZN = moneyFactory('MZN');
/**
 * Namibian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = NAD('1.25');// Money({ currency: Currency({ code: 'NAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NAD = moneyFactory('NAD');
/**
 * Nigerian Naira money factory
 *
 * @example
 * ```typescript
 * const money = NGN('1.25');// Money({ currency: Currency({ code: 'NGN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NGN = moneyFactory('NGN');
/**
 * Nicaraguan Córdoba money factory
 *
 * @example
 * ```typescript
 * const money = NIO('1.25');// Money({ currency: Currency({ code: 'NIO' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NIO = moneyFactory('NIO');
/**
 * Norwegian Krone money factory
 *
 * @example
 * ```typescript
 * const money = NOK('1.25');// Money({ currency: Currency({ code: 'NOK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NOK = moneyFactory('NOK');
/**
 * Nepalese Rupee money factory
 *
 * @example
 * ```typescript
 * const money = NPR('1.25');// Money({ currency: Currency({ code: 'NPR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NPR = moneyFactory('NPR');
/**
 * New Zealand Dollar money factory
 *
 * @example
 * ```typescript
 * const money = NZD('1.25');// Money({ currency: Currency({ code: 'NZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NZD = moneyFactory('NZD');
/**
 * Omani Rial money factory
 *
 * @example
 * ```typescript
 * const money = OMR('1.25');// Money({ currency: Currency({ code: 'OMR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const OMR = moneyFactory('OMR');
/**
 * Panamanian Balboa money factory
 *
 * @example
 * ```typescript
 * const money = PAB('1.25');// Money({ currency: Currency({ code: 'PAB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PAB = moneyFactory('PAB');
/**
 * Peruvian Nuevo Sol money factory
 *
 * @example
 * ```typescript
 * const money = PEN('1.25');// Money({ currency: Currency({ code: 'PEN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PEN = moneyFactory('PEN');
/**
 * Philippine Peso money factory
 *
 * @example
 * ```typescript
 * const money = PHP('1.25');// Money({ currency: Currency({ code: 'PHP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PHP = moneyFactory('PHP');
/**
 * Pakistani Rupee money factory
 *
 * @example
 * ```typescript
 * const money = PKR('1.25');// Money({ currency: Currency({ code: 'PKR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PKR = moneyFactory('PKR');
/**
 * Polish Zloty money factory
 *
 * @example
 * ```typescript
 * const money = PLN('1.25');// Money({ currency: Currency({ code: 'PLN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PLN = moneyFactory('PLN');
/**
 * Paraguayan Guarani money factory
 *
 * @example
 * ```typescript
 * const money = PYG('1.25');// Money({ currency: Currency({ code: 'PYG' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PYG = moneyFactory('PYG');
/**
 * Qatari Rial money factory
 *
 * @example
 * ```typescript
 * const money = QAR('1.25');// Money({ currency: Currency({ code: 'QAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const QAR = moneyFactory('QAR');
/**
 * Romanian Leu money factory
 *
 * @example
 * ```typescript
 * const money = RON('1.25');// Money({ currency: Currency({ code: 'RON' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RON = moneyFactory('RON');
/**
 * Serbian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = RSD('1.25');// Money({ currency: Currency({ code: 'RSD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RSD = moneyFactory('RSD');
/**
 * Russian Ruble money factory
 *
 * @example
 * ```typescript
 * const money = RUB('1.25');// Money({ currency: Currency({ code: 'RUB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RUB = moneyFactory('RUB');
/**
 * Rwandan Franc money factory
 *
 * @example
 * ```typescript
 * const money = RWF('1.25');// Money({ currency: Currency({ code: 'RWF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RWF = moneyFactory('RWF');
/**
 * Saudi Riyal money factory
 *
 * @example
 * ```typescript
 * const money = SAR('1.25');// Money({ currency: Currency({ code: 'SAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SAR = moneyFactory('SAR');
/**
 * Sudanese Pound money factory
 *
 * @example
 * ```typescript
 * const money = SDG('1.25');// Money({ currency: Currency({ code: 'SDG' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SDG = moneyFactory('SDG');
/**
 * Swedish Krona money factory
 *
 * @example
 * ```typescript
 * const money = SEK('1.25');// Money({ currency: Currency({ code: 'SEK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SEK = moneyFactory('SEK');
/**
 * Singapore Dollar money factory
 *
 * @example
 * ```typescript
 * const money = SGD('1.25');// Money({ currency: Currency({ code: 'SGD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SGD = moneyFactory('SGD');
/**
 * Somali Shilling money factory
 *
 * @example
 * ```typescript
 * const money = SOS('1.25');// Money({ currency: Currency({ code: 'SOS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SOS = moneyFactory('SOS');
/**
 * Syrian Pound money factory
 *
 * @example
 * ```typescript
 * const money = SYP('1.25');// Money({ currency: Currency({ code: 'SYP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SYP = moneyFactory('SYP');
/**
 * Thai Baht money factory
 *
 * @example
 * ```typescript
 * const money = THB('1.25');// Money({ currency: Currency({ code: 'THB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const THB = moneyFactory('THB');
/**
 * Tunisian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = TND('1.25');// Money({ currency: Currency({ code: 'TND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TND = moneyFactory('TND');
/**
 * Tongan Paʻanga money factory
 *
 * @example
 * ```typescript
 * const money = TOP('1.25');// Money({ currency: Currency({ code: 'TOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TOP = moneyFactory('TOP');
/**
 * Turkish Lira money factory
 *
 * @example
 * ```typescript
 * const money = TRY('1.25');// Money({ currency: Currency({ code: 'TRY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TRY = moneyFactory('TRY');
/**
 * Trinidad and Tobago Dollar money factory
 *
 * @example
 * ```typescript
 * const money = TTD('1.25');// Money({ currency: Currency({ code: 'TTD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TTD = moneyFactory('TTD');
/**
 * New Taiwan Dollar money factory
 *
 * @example
 * ```typescript
 * const money = TWD('1.25');// Money({ currency: Currency({ code: 'TWD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TWD = moneyFactory('TWD');
/**
 * Tanzanian Shilling money factory
 *
 * @example
 * ```typescript
 * const money = TZS('1.25');// Money({ currency: Currency({ code: 'TZS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TZS = moneyFactory('TZS');
/**
 * Ukrainian Hryvnia money factory
 *
 * @example
 * ```typescript
 * const money = UAH('1.25');// Money({ currency: Currency({ code: 'UAH' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UAH = moneyFactory('UAH');
/**
 * Ugandan Shilling money factory
 *
 * @example
 * ```typescript
 * const money = UGX('1.25');// Money({ currency: Currency({ code: 'UGX' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UGX = moneyFactory('UGX');
/**
 * Uruguayan Peso money factory
 *
 * @example
 * ```typescript
 * const money = UYU('1.25');// Money({ currency: Currency({ code: 'UYU' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UYU = moneyFactory('UYU');
/**
 * Uzbekistan Som money factory
 *
 * @example
 * ```typescript
 * const money = UZS('1.25');// Money({ currency: Currency({ code: 'UZS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UZS = moneyFactory('UZS');
/**
 * Venezuelan Bolívar money factory
 *
 * @example
 * ```typescript
 * const money = VEF('1.25');// Money({ currency: Currency({ code: 'VEF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const VEF = moneyFactory('VEF');
/**
 * Vietnamese Dong money factory
 *
 * @example
 * ```typescript
 * const money = VND('1.25');// Money({ currency: Currency({ code: 'VND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const VND = moneyFactory('VND');
/**
 * CFA Franc BEAC money factory
 *
 * @example
 * ```typescript
 * const money = XAF('1.25');// Money({ currency: Currency({ code: 'XAF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const XAF = moneyFactory('XAF');
/**
 * CFA Franc BCEAO money factory
 *
 * @example
 * ```typescript
 * const money = XOF('1.25');// Money({ currency: Currency({ code: 'XOF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const XOF = moneyFactory('XOF');
/**
 * Yemeni Rial money factory
 *
 * @example
 * ```typescript
 * const money = YER('1.25');// Money({ currency: Currency({ code: 'YER' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const YER = moneyFactory('YER');
/**
 * South African Rand money factory
 *
 * @example
 * ```typescript
 * const money = ZAR('1.25');// Money({ currency: Currency({ code: 'ZAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZAR = moneyFactory('ZAR');
/**
 * Zambian Kwacha money factory
 *
 * @example
 * ```typescript
 * const money = ZMK('1.25');// Money({ currency: Currency({ code: 'ZMK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZMK = moneyFactory('ZMK');
/**
 * Zimbabwean Dollar money factory
 *
 * @example
 * ```typescript
 * const money = ZWL('1.25');// Money({ currency: Currency({ code: 'ZWL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZWL = moneyFactory('ZWL');
