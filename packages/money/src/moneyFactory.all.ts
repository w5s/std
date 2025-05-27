/* eslint-disable prettier/prettier */
/* cSpell:disable */
import { Currency } from './Currency.js';
import { factory as moneyFactory } from './Money/factory.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';

const register = (
  code: Currency['code'],
  precision: number,
  name: Currency['name'],
  namePlural: Currency['namePlural'],
  rounding: number,
  symbol: Currency['symbol'],
  symbolNative: Currency['symbolNative'],
) => {
  CurrencyRegistry.add(
    Currency({
      code,
      precision: precision as Currency['precision'],
      name,
      namePlural,
      rounding: rounding as Currency['rounding'],
      symbol,
      symbolNative,
    }),
  );
  return moneyFactory(code);
};

/**
 * US Dollar money factory
 *
 * @example
 * ```typescript
 * const money = USD('1.25');// Money({ currency: Currency({ code: 'USD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const USD = register('USD', 2, 'US Dollar', 'US dollars', 0, '$', '$');
/**
 * Canadian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = CAD('1.25');// Money({ currency: Currency({ code: 'CAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CAD = register('CAD', 2, 'Canadian Dollar', 'Canadian dollars', 0, 'CA$', '$');
/**
 * Euro money factory
 *
 * @example
 * ```typescript
 * const money = EUR('1.25');// Money({ currency: Currency({ code: 'EUR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EUR = register('EUR', 2, 'Euro', 'euros', 0, '€', '€');
/**
 * United Arab Emirates Dirham money factory
 *
 * @example
 * ```typescript
 * const money = AED('1.25');// Money({ currency: Currency({ code: 'AED' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AED = register('AED', 2, 'United Arab Emirates Dirham', 'UAE dirhams', 0, 'AED', 'د.إ.‏');
/**
 * Afghan Afghani money factory
 *
 * @example
 * ```typescript
 * const money = AFN('1.25');// Money({ currency: Currency({ code: 'AFN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AFN = register('AFN', 0, 'Afghan Afghani', 'Afghan Afghanis', 0, 'Af', '؋');
/**
 * Albanian Lek money factory
 *
 * @example
 * ```typescript
 * const money = ALL('1.25');// Money({ currency: Currency({ code: 'ALL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ALL = register('ALL', 0, 'Albanian Lek', 'Albanian lekë', 0, 'ALL', 'Lek');
/**
 * Armenian Dram money factory
 *
 * @example
 * ```typescript
 * const money = AMD('1.25');// Money({ currency: Currency({ code: 'AMD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AMD = register('AMD', 0, 'Armenian Dram', 'Armenian drams', 0, 'AMD', 'դր.');
/**
 * Argentine Peso money factory
 *
 * @example
 * ```typescript
 * const money = ARS('1.25');// Money({ currency: Currency({ code: 'ARS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ARS = register('ARS', 2, 'Argentine Peso', 'Argentine pesos', 0, 'AR$', '$');
/**
 * Australian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = AUD('1.25');// Money({ currency: Currency({ code: 'AUD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AUD = register('AUD', 2, 'Australian Dollar', 'Australian dollars', 0, 'AU$', '$');
/**
 * Azerbaijani Manat money factory
 *
 * @example
 * ```typescript
 * const money = AZN('1.25');// Money({ currency: Currency({ code: 'AZN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const AZN = register('AZN', 2, 'Azerbaijani Manat', 'Azerbaijani manats', 0, 'man.', 'ман.');
/**
 * Bosnia-Herzegovina Convertible Mark money factory
 *
 * @example
 * ```typescript
 * const money = BAM('1.25');// Money({ currency: Currency({ code: 'BAM' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BAM = register('BAM', 2, 'Bosnia-Herzegovina Convertible Mark', 'Bosnia-Herzegovina convertible marks', 0, 'KM', 'KM');
/**
 * Bangladeshi Taka money factory
 *
 * @example
 * ```typescript
 * const money = BDT('1.25');// Money({ currency: Currency({ code: 'BDT' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BDT = register('BDT', 2, 'Bangladeshi Taka', 'Bangladeshi takas', 0, 'Tk', '৳');
/**
 * Bulgarian Lev money factory
 *
 * @example
 * ```typescript
 * const money = BGN('1.25');// Money({ currency: Currency({ code: 'BGN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BGN = register('BGN', 2, 'Bulgarian Lev', 'Bulgarian leva', 0, 'BGN', 'лв.');
/**
 * Bahraini Dinar money factory
 *
 * @example
 * ```typescript
 * const money = BHD('1.25');// Money({ currency: Currency({ code: 'BHD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BHD = register('BHD', 3, 'Bahraini Dinar', 'Bahraini dinars', 0, 'BD', 'د.ب.‏');
/**
 * Burundian Franc money factory
 *
 * @example
 * ```typescript
 * const money = BIF('1.25');// Money({ currency: Currency({ code: 'BIF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BIF = register('BIF', 0, 'Burundian Franc', 'Burundian francs', 0, 'FBu', 'FBu');
/**
 * Brunei Dollar money factory
 *
 * @example
 * ```typescript
 * const money = BND('1.25');// Money({ currency: Currency({ code: 'BND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BND = register('BND', 2, 'Brunei Dollar', 'Brunei dollars', 0, 'BN$', '$');
/**
 * Bolivian Boliviano money factory
 *
 * @example
 * ```typescript
 * const money = BOB('1.25');// Money({ currency: Currency({ code: 'BOB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BOB = register('BOB', 2, 'Bolivian Boliviano', 'Bolivian bolivianos', 0, 'Bs', 'Bs');
/**
 * Brazilian Real money factory
 *
 * @example
 * ```typescript
 * const money = BRL('1.25');// Money({ currency: Currency({ code: 'BRL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BRL = register('BRL', 2, 'Brazilian Real', 'Brazilian reals', 0, 'R$', 'R$');
/**
 * Botswanan Pula money factory
 *
 * @example
 * ```typescript
 * const money = BWP('1.25');// Money({ currency: Currency({ code: 'BWP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BWP = register('BWP', 2, 'Botswanan Pula', 'Botswanan pulas', 0, 'BWP', 'P');
/**
 * Belarusian Ruble money factory
 *
 * @example
 * ```typescript
 * const money = BYN('1.25');// Money({ currency: Currency({ code: 'BYN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BYN = register('BYN', 2, 'Belarusian Ruble', 'Belarusian rubles', 0, 'Br', 'руб.');
/**
 * Belize Dollar money factory
 *
 * @example
 * ```typescript
 * const money = BZD('1.25');// Money({ currency: Currency({ code: 'BZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const BZD = register('BZD', 2, 'Belize Dollar', 'Belize dollars', 0, 'BZ$', '$');
/**
 * Congolese Franc money factory
 *
 * @example
 * ```typescript
 * const money = CDF('1.25');// Money({ currency: Currency({ code: 'CDF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CDF = register('CDF', 2, 'Congolese Franc', 'Congolese francs', 0, 'CDF', 'FrCD');
/**
 * Swiss Franc money factory
 *
 * @example
 * ```typescript
 * const money = CHF('1.25');// Money({ currency: Currency({ code: 'CHF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CHF = register('CHF', 2, 'Swiss Franc', 'Swiss francs', 0.05, 'CHF', 'CHF');
/**
 * Chilean Peso money factory
 *
 * @example
 * ```typescript
 * const money = CLP('1.25');// Money({ currency: Currency({ code: 'CLP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CLP = register('CLP', 0, 'Chilean Peso', 'Chilean pesos', 0, 'CL$', '$');
/**
 * Chinese Yuan money factory
 *
 * @example
 * ```typescript
 * const money = CNY('1.25');// Money({ currency: Currency({ code: 'CNY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CNY = register('CNY', 2, 'Chinese Yuan', 'Chinese yuan', 0, 'CN¥', 'CN¥');
/**
 * Colombian Peso money factory
 *
 * @example
 * ```typescript
 * const money = COP('1.25');// Money({ currency: Currency({ code: 'COP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const COP = register('COP', 0, 'Colombian Peso', 'Colombian pesos', 0, 'CO$', '$');
/**
 * Costa Rican Colón money factory
 *
 * @example
 * ```typescript
 * const money = CRC('1.25');// Money({ currency: Currency({ code: 'CRC' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CRC = register('CRC', 0, 'Costa Rican Colón', 'Costa Rican colóns', 0, '₡', '₡');
/**
 * Cape Verdean Escudo money factory
 *
 * @example
 * ```typescript
 * const money = CVE('1.25');// Money({ currency: Currency({ code: 'CVE' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CVE = register('CVE', 2, 'Cape Verdean Escudo', 'Cape Verdean escudos', 0, 'CV$', 'CV$');
/**
 * Czech Republic Koruna money factory
 *
 * @example
 * ```typescript
 * const money = CZK('1.25');// Money({ currency: Currency({ code: 'CZK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const CZK = register('CZK', 2, 'Czech Republic Koruna', 'Czech Republic korunas', 0, 'Kč', 'Kč');
/**
 * Djiboutian Franc money factory
 *
 * @example
 * ```typescript
 * const money = DJF('1.25');// Money({ currency: Currency({ code: 'DJF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DJF = register('DJF', 0, 'Djiboutian Franc', 'Djiboutian francs', 0, 'Fdj', 'Fdj');
/**
 * Danish Krone money factory
 *
 * @example
 * ```typescript
 * const money = DKK('1.25');// Money({ currency: Currency({ code: 'DKK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DKK = register('DKK', 2, 'Danish Krone', 'Danish kroner', 0, 'Dkr', 'kr');
/**
 * Dominican Peso money factory
 *
 * @example
 * ```typescript
 * const money = DOP('1.25');// Money({ currency: Currency({ code: 'DOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DOP = register('DOP', 2, 'Dominican Peso', 'Dominican pesos', 0, 'RD$', 'RD$');
/**
 * Algerian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = DZD('1.25');// Money({ currency: Currency({ code: 'DZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const DZD = register('DZD', 2, 'Algerian Dinar', 'Algerian dinars', 0, 'DA', 'د.ج.‏');
/**
 * Estonian Kroon money factory
 *
 * @example
 * ```typescript
 * const money = EEK('1.25');// Money({ currency: Currency({ code: 'EEK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EEK = register('EEK', 2, 'Estonian Kroon', 'Estonian kroons', 0, 'Ekr', 'kr');
/**
 * Egyptian Pound money factory
 *
 * @example
 * ```typescript
 * const money = EGP('1.25');// Money({ currency: Currency({ code: 'EGP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const EGP = register('EGP', 2, 'Egyptian Pound', 'Egyptian pounds', 0, 'EGP', 'ج.م.‏');
/**
 * Eritrean Nakfa money factory
 *
 * @example
 * ```typescript
 * const money = ERN('1.25');// Money({ currency: Currency({ code: 'ERN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ERN = register('ERN', 2, 'Eritrean Nakfa', 'Eritrean nakfas', 0, 'Nfk', 'Nfk');
/**
 * Ethiopian Birr money factory
 *
 * @example
 * ```typescript
 * const money = ETB('1.25');// Money({ currency: Currency({ code: 'ETB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ETB = register('ETB', 2, 'Ethiopian Birr', 'Ethiopian birrs', 0, 'Br', 'Br');
/**
 * British Pound Sterling money factory
 *
 * @example
 * ```typescript
 * const money = GBP('1.25');// Money({ currency: Currency({ code: 'GBP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GBP = register('GBP', 2, 'British Pound Sterling', 'British pounds sterling', 0, '£', '£');
/**
 * Georgian Lari money factory
 *
 * @example
 * ```typescript
 * const money = GEL('1.25');// Money({ currency: Currency({ code: 'GEL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GEL = register('GEL', 2, 'Georgian Lari', 'Georgian laris', 0, 'GEL', 'GEL');
/**
 * Ghanaian Cedi money factory
 *
 * @example
 * ```typescript
 * const money = GHS('1.25');// Money({ currency: Currency({ code: 'GHS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GHS = register('GHS', 2, 'Ghanaian Cedi', 'Ghanaian cedis', 0, 'GH₵', 'GH₵');
/**
 * Guinean Franc money factory
 *
 * @example
 * ```typescript
 * const money = GNF('1.25');// Money({ currency: Currency({ code: 'GNF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GNF = register('GNF', 0, 'Guinean Franc', 'Guinean francs', 0, 'FG', 'FG');
/**
 * Guatemalan Quetzal money factory
 *
 * @example
 * ```typescript
 * const money = GTQ('1.25');// Money({ currency: Currency({ code: 'GTQ' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const GTQ = register('GTQ', 2, 'Guatemalan Quetzal', 'Guatemalan quetzals', 0, 'GTQ', 'Q');
/**
 * Hong Kong Dollar money factory
 *
 * @example
 * ```typescript
 * const money = HKD('1.25');// Money({ currency: Currency({ code: 'HKD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HKD = register('HKD', 2, 'Hong Kong Dollar', 'Hong Kong dollars', 0, 'HK$', '$');
/**
 * Honduran Lempira money factory
 *
 * @example
 * ```typescript
 * const money = HNL('1.25');// Money({ currency: Currency({ code: 'HNL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HNL = register('HNL', 2, 'Honduran Lempira', 'Honduran lempiras', 0, 'HNL', 'L');
/**
 * Croatian Kuna money factory
 *
 * @example
 * ```typescript
 * const money = HRK('1.25');// Money({ currency: Currency({ code: 'HRK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HRK = register('HRK', 2, 'Croatian Kuna', 'Croatian kunas', 0, 'kn', 'kn');
/**
 * Hungarian Forint money factory
 *
 * @example
 * ```typescript
 * const money = HUF('1.25');// Money({ currency: Currency({ code: 'HUF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const HUF = register('HUF', 0, 'Hungarian Forint', 'Hungarian forints', 0, 'Ft', 'Ft');
/**
 * Indonesian Rupiah money factory
 *
 * @example
 * ```typescript
 * const money = IDR('1.25');// Money({ currency: Currency({ code: 'IDR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IDR = register('IDR', 0, 'Indonesian Rupiah', 'Indonesian rupiahs', 0, 'Rp', 'Rp');
/**
 * Israeli New Sheqel money factory
 *
 * @example
 * ```typescript
 * const money = ILS('1.25');// Money({ currency: Currency({ code: 'ILS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ILS = register('ILS', 2, 'Israeli New Sheqel', 'Israeli new sheqels', 0, '₪', '₪');
/**
 * Indian Rupee money factory
 *
 * @example
 * ```typescript
 * const money = INR('1.25');// Money({ currency: Currency({ code: 'INR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const INR = register('INR', 2, 'Indian Rupee', 'Indian rupees', 0, 'Rs', 'টকা');
/**
 * Iraqi Dinar money factory
 *
 * @example
 * ```typescript
 * const money = IQD('1.25');// Money({ currency: Currency({ code: 'IQD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IQD = register('IQD', 0, 'Iraqi Dinar', 'Iraqi dinars', 0, 'IQD', 'د.ع.‏');
/**
 * Iranian Rial money factory
 *
 * @example
 * ```typescript
 * const money = IRR('1.25');// Money({ currency: Currency({ code: 'IRR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const IRR = register('IRR', 0, 'Iranian Rial', 'Iranian rials', 0, 'IRR', '﷼');
/**
 * Icelandic Króna money factory
 *
 * @example
 * ```typescript
 * const money = ISK('1.25');// Money({ currency: Currency({ code: 'ISK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ISK = register('ISK', 0, 'Icelandic Króna', 'Icelandic krónur', 0, 'Ikr', 'kr');
/**
 * Jamaican Dollar money factory
 *
 * @example
 * ```typescript
 * const money = JMD('1.25');// Money({ currency: Currency({ code: 'JMD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JMD = register('JMD', 2, 'Jamaican Dollar', 'Jamaican dollars', 0, 'J$', '$');
/**
 * Jordanian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = JOD('1.25');// Money({ currency: Currency({ code: 'JOD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JOD = register('JOD', 3, 'Jordanian Dinar', 'Jordanian dinars', 0, 'JD', 'د.أ.‏');
/**
 * Japanese Yen money factory
 *
 * @example
 * ```typescript
 * const money = JPY('1.25');// Money({ currency: Currency({ code: 'JPY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const JPY = register('JPY', 0, 'Japanese Yen', 'Japanese yen', 0, '¥', '￥');
/**
 * Kenyan Shilling money factory
 *
 * @example
 * ```typescript
 * const money = KES('1.25');// Money({ currency: Currency({ code: 'KES' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KES = register('KES', 2, 'Kenyan Shilling', 'Kenyan shillings', 0, 'Ksh', 'Ksh');
/**
 * Cambodian Riel money factory
 *
 * @example
 * ```typescript
 * const money = KHR('1.25');// Money({ currency: Currency({ code: 'KHR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KHR = register('KHR', 2, 'Cambodian Riel', 'Cambodian riels', 0, 'KHR', '៛');
/**
 * Comorian Franc money factory
 *
 * @example
 * ```typescript
 * const money = KMF('1.25');// Money({ currency: Currency({ code: 'KMF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KMF = register('KMF', 0, 'Comorian Franc', 'Comorian francs', 0, 'CF', 'FC');
/**
 * South Korean Won money factory
 *
 * @example
 * ```typescript
 * const money = KRW('1.25');// Money({ currency: Currency({ code: 'KRW' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KRW = register('KRW', 0, 'South Korean Won', 'South Korean won', 0, '₩', '₩');
/**
 * Kuwaiti Dinar money factory
 *
 * @example
 * ```typescript
 * const money = KWD('1.25');// Money({ currency: Currency({ code: 'KWD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KWD = register('KWD', 3, 'Kuwaiti Dinar', 'Kuwaiti dinars', 0, 'KD', 'د.ك.‏');
/**
 * Kazakhstani Tenge money factory
 *
 * @example
 * ```typescript
 * const money = KZT('1.25');// Money({ currency: Currency({ code: 'KZT' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const KZT = register('KZT', 2, 'Kazakhstani Tenge', 'Kazakhstani tenges', 0, 'KZT', 'тңг.');
/**
 * Lebanese Pound money factory
 *
 * @example
 * ```typescript
 * const money = LBP('1.25');// Money({ currency: Currency({ code: 'LBP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LBP = register('LBP', 0, 'Lebanese Pound', 'Lebanese pounds', 0, 'LB£', 'ل.ل.‏');
/**
 * Sri Lankan Rupee money factory
 *
 * @example
 * ```typescript
 * const money = LKR('1.25');// Money({ currency: Currency({ code: 'LKR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LKR = register('LKR', 2, 'Sri Lankan Rupee', 'Sri Lankan rupees', 0, 'SLRs', 'SL Re');
/**
 * Lithuanian Litas money factory
 *
 * @example
 * ```typescript
 * const money = LTL('1.25');// Money({ currency: Currency({ code: 'LTL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LTL = register('LTL', 2, 'Lithuanian Litas', 'Lithuanian litai', 0, 'Lt', 'Lt');
/**
 * Latvian Lats money factory
 *
 * @example
 * ```typescript
 * const money = LVL('1.25');// Money({ currency: Currency({ code: 'LVL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LVL = register('LVL', 2, 'Latvian Lats', 'Latvian lati', 0, 'Ls', 'Ls');
/**
 * Libyan Dinar money factory
 *
 * @example
 * ```typescript
 * const money = LYD('1.25');// Money({ currency: Currency({ code: 'LYD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const LYD = register('LYD', 3, 'Libyan Dinar', 'Libyan dinars', 0, 'LD', 'د.ل.‏');
/**
 * Moroccan Dirham money factory
 *
 * @example
 * ```typescript
 * const money = MAD('1.25');// Money({ currency: Currency({ code: 'MAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MAD = register('MAD', 2, 'Moroccan Dirham', 'Moroccan dirhams', 0, 'MAD', 'د.م.‏');
/**
 * Moldovan Leu money factory
 *
 * @example
 * ```typescript
 * const money = MDL('1.25');// Money({ currency: Currency({ code: 'MDL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MDL = register('MDL', 2, 'Moldovan Leu', 'Moldovan lei', 0, 'MDL', 'MDL');
/**
 * Malagasy Ariary money factory
 *
 * @example
 * ```typescript
 * const money = MGA('1.25');// Money({ currency: Currency({ code: 'MGA' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MGA = register('MGA', 0, 'Malagasy Ariary', 'Malagasy Ariaries', 0, 'MGA', 'MGA');
/**
 * Macedonian Denar money factory
 *
 * @example
 * ```typescript
 * const money = MKD('1.25');// Money({ currency: Currency({ code: 'MKD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MKD = register('MKD', 2, 'Macedonian Denar', 'Macedonian denari', 0, 'MKD', 'MKD');
/**
 * Myanma Kyat money factory
 *
 * @example
 * ```typescript
 * const money = MMK('1.25');// Money({ currency: Currency({ code: 'MMK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MMK = register('MMK', 0, 'Myanma Kyat', 'Myanma kyats', 0, 'MMK', 'K');
/**
 * Macanese Pataca money factory
 *
 * @example
 * ```typescript
 * const money = MOP('1.25');// Money({ currency: Currency({ code: 'MOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MOP = register('MOP', 2, 'Macanese Pataca', 'Macanese patacas', 0, 'MOP$', 'MOP$');
/**
 * Mauritian Rupee money factory
 *
 * @example
 * ```typescript
 * const money = MUR('1.25');// Money({ currency: Currency({ code: 'MUR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MUR = register('MUR', 0, 'Mauritian Rupee', 'Mauritian rupees', 0, 'MURs', 'MURs');
/**
 * Mexican Peso money factory
 *
 * @example
 * ```typescript
 * const money = MXN('1.25');// Money({ currency: Currency({ code: 'MXN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MXN = register('MXN', 2, 'Mexican Peso', 'Mexican pesos', 0, 'MX$', '$');
/**
 * Malaysian Ringgit money factory
 *
 * @example
 * ```typescript
 * const money = MYR('1.25');// Money({ currency: Currency({ code: 'MYR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MYR = register('MYR', 2, 'Malaysian Ringgit', 'Malaysian ringgits', 0, 'RM', 'RM');
/**
 * Mozambican Metical money factory
 *
 * @example
 * ```typescript
 * const money = MZN('1.25');// Money({ currency: Currency({ code: 'MZN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const MZN = register('MZN', 2, 'Mozambican Metical', 'Mozambican meticals', 0, 'MTn', 'MTn');
/**
 * Namibian Dollar money factory
 *
 * @example
 * ```typescript
 * const money = NAD('1.25');// Money({ currency: Currency({ code: 'NAD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NAD = register('NAD', 2, 'Namibian Dollar', 'Namibian dollars', 0, 'N$', 'N$');
/**
 * Nigerian Naira money factory
 *
 * @example
 * ```typescript
 * const money = NGN('1.25');// Money({ currency: Currency({ code: 'NGN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NGN = register('NGN', 2, 'Nigerian Naira', 'Nigerian nairas', 0, '₦', '₦');
/**
 * Nicaraguan Córdoba money factory
 *
 * @example
 * ```typescript
 * const money = NIO('1.25');// Money({ currency: Currency({ code: 'NIO' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NIO = register('NIO', 2, 'Nicaraguan Córdoba', 'Nicaraguan córdobas', 0, 'C$', 'C$');
/**
 * Norwegian Krone money factory
 *
 * @example
 * ```typescript
 * const money = NOK('1.25');// Money({ currency: Currency({ code: 'NOK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NOK = register('NOK', 2, 'Norwegian Krone', 'Norwegian kroner', 0, 'Nkr', 'kr');
/**
 * Nepalese Rupee money factory
 *
 * @example
 * ```typescript
 * const money = NPR('1.25');// Money({ currency: Currency({ code: 'NPR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NPR = register('NPR', 2, 'Nepalese Rupee', 'Nepalese rupees', 0, 'NPRs', 'नेरू');
/**
 * New Zealand Dollar money factory
 *
 * @example
 * ```typescript
 * const money = NZD('1.25');// Money({ currency: Currency({ code: 'NZD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const NZD = register('NZD', 2, 'New Zealand Dollar', 'New Zealand dollars', 0, 'NZ$', '$');
/**
 * Omani Rial money factory
 *
 * @example
 * ```typescript
 * const money = OMR('1.25');// Money({ currency: Currency({ code: 'OMR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const OMR = register('OMR', 3, 'Omani Rial', 'Omani rials', 0, 'OMR', 'ر.ع.‏');
/**
 * Panamanian Balboa money factory
 *
 * @example
 * ```typescript
 * const money = PAB('1.25');// Money({ currency: Currency({ code: 'PAB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PAB = register('PAB', 2, 'Panamanian Balboa', 'Panamanian balboas', 0, 'B/.', 'B/.');
/**
 * Peruvian Nuevo Sol money factory
 *
 * @example
 * ```typescript
 * const money = PEN('1.25');// Money({ currency: Currency({ code: 'PEN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PEN = register('PEN', 2, 'Peruvian Nuevo Sol', 'Peruvian nuevos soles', 0, 'S/.', 'S/.');
/**
 * Philippine Peso money factory
 *
 * @example
 * ```typescript
 * const money = PHP('1.25');// Money({ currency: Currency({ code: 'PHP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PHP = register('PHP', 2, 'Philippine Peso', 'Philippine pesos', 0, '₱', '₱');
/**
 * Pakistani Rupee money factory
 *
 * @example
 * ```typescript
 * const money = PKR('1.25');// Money({ currency: Currency({ code: 'PKR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PKR = register('PKR', 0, 'Pakistani Rupee', 'Pakistani rupees', 0, 'PKRs', '₨');
/**
 * Polish Zloty money factory
 *
 * @example
 * ```typescript
 * const money = PLN('1.25');// Money({ currency: Currency({ code: 'PLN' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PLN = register('PLN', 2, 'Polish Zloty', 'Polish zlotys', 0, 'zł', 'zł');
/**
 * Paraguayan Guarani money factory
 *
 * @example
 * ```typescript
 * const money = PYG('1.25');// Money({ currency: Currency({ code: 'PYG' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const PYG = register('PYG', 0, 'Paraguayan Guarani', 'Paraguayan guaranis', 0, '₲', '₲');
/**
 * Qatari Rial money factory
 *
 * @example
 * ```typescript
 * const money = QAR('1.25');// Money({ currency: Currency({ code: 'QAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const QAR = register('QAR', 2, 'Qatari Rial', 'Qatari rials', 0, 'QR', 'ر.ق.‏');
/**
 * Romanian Leu money factory
 *
 * @example
 * ```typescript
 * const money = RON('1.25');// Money({ currency: Currency({ code: 'RON' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RON = register('RON', 2, 'Romanian Leu', 'Romanian lei', 0, 'RON', 'RON');
/**
 * Serbian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = RSD('1.25');// Money({ currency: Currency({ code: 'RSD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RSD = register('RSD', 0, 'Serbian Dinar', 'Serbian dinars', 0, 'din.', 'дин.');
/**
 * Russian Ruble money factory
 *
 * @example
 * ```typescript
 * const money = RUB('1.25');// Money({ currency: Currency({ code: 'RUB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RUB = register('RUB', 2, 'Russian Ruble', 'Russian rubles', 0, 'RUB', '₽.');
/**
 * Rwandan Franc money factory
 *
 * @example
 * ```typescript
 * const money = RWF('1.25');// Money({ currency: Currency({ code: 'RWF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const RWF = register('RWF', 0, 'Rwandan Franc', 'Rwandan francs', 0, 'RWF', 'FR');
/**
 * Saudi Riyal money factory
 *
 * @example
 * ```typescript
 * const money = SAR('1.25');// Money({ currency: Currency({ code: 'SAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SAR = register('SAR', 2, 'Saudi Riyal', 'Saudi riyals', 0, 'SR', 'ر.س.‏');
/**
 * Sudanese Pound money factory
 *
 * @example
 * ```typescript
 * const money = SDG('1.25');// Money({ currency: Currency({ code: 'SDG' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SDG = register('SDG', 2, 'Sudanese Pound', 'Sudanese pounds', 0, 'SDG', 'SDG');
/**
 * Swedish Krona money factory
 *
 * @example
 * ```typescript
 * const money = SEK('1.25');// Money({ currency: Currency({ code: 'SEK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SEK = register('SEK', 2, 'Swedish Krona', 'Swedish kronor', 0, 'Skr', 'kr');
/**
 * Singapore Dollar money factory
 *
 * @example
 * ```typescript
 * const money = SGD('1.25');// Money({ currency: Currency({ code: 'SGD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SGD = register('SGD', 2, 'Singapore Dollar', 'Singapore dollars', 0, 'S$', '$');
/**
 * Somali Shilling money factory
 *
 * @example
 * ```typescript
 * const money = SOS('1.25');// Money({ currency: Currency({ code: 'SOS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SOS = register('SOS', 0, 'Somali Shilling', 'Somali shillings', 0, 'Ssh', 'Ssh');
/**
 * Syrian Pound money factory
 *
 * @example
 * ```typescript
 * const money = SYP('1.25');// Money({ currency: Currency({ code: 'SYP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const SYP = register('SYP', 0, 'Syrian Pound', 'Syrian pounds', 0, 'SY£', 'ل.س.‏');
/**
 * Thai Baht money factory
 *
 * @example
 * ```typescript
 * const money = THB('1.25');// Money({ currency: Currency({ code: 'THB' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const THB = register('THB', 2, 'Thai Baht', 'Thai baht', 0, '฿', '฿');
/**
 * Tunisian Dinar money factory
 *
 * @example
 * ```typescript
 * const money = TND('1.25');// Money({ currency: Currency({ code: 'TND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TND = register('TND', 3, 'Tunisian Dinar', 'Tunisian dinars', 0, 'DT', 'د.ت.‏');
/**
 * Tongan Paʻanga money factory
 *
 * @example
 * ```typescript
 * const money = TOP('1.25');// Money({ currency: Currency({ code: 'TOP' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TOP = register('TOP', 2, 'Tongan Paʻanga', 'Tongan paʻanga', 0, 'T$', 'T$');
/**
 * Turkish Lira money factory
 *
 * @example
 * ```typescript
 * const money = TRY('1.25');// Money({ currency: Currency({ code: 'TRY' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TRY = register('TRY', 2, 'Turkish Lira', 'Turkish Lira', 0, 'TL', 'TL');
/**
 * Trinidad and Tobago Dollar money factory
 *
 * @example
 * ```typescript
 * const money = TTD('1.25');// Money({ currency: Currency({ code: 'TTD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TTD = register('TTD', 2, 'Trinidad and Tobago Dollar', 'Trinidad and Tobago dollars', 0, 'TT$', '$');
/**
 * New Taiwan Dollar money factory
 *
 * @example
 * ```typescript
 * const money = TWD('1.25');// Money({ currency: Currency({ code: 'TWD' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TWD = register('TWD', 2, 'New Taiwan Dollar', 'New Taiwan dollars', 0, 'NT$', 'NT$');
/**
 * Tanzanian Shilling money factory
 *
 * @example
 * ```typescript
 * const money = TZS('1.25');// Money({ currency: Currency({ code: 'TZS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const TZS = register('TZS', 0, 'Tanzanian Shilling', 'Tanzanian shillings', 0, 'TSh', 'TSh');
/**
 * Ukrainian Hryvnia money factory
 *
 * @example
 * ```typescript
 * const money = UAH('1.25');// Money({ currency: Currency({ code: 'UAH' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UAH = register('UAH', 2, 'Ukrainian Hryvnia', 'Ukrainian hryvnias', 0, '₴', '₴');
/**
 * Ugandan Shilling money factory
 *
 * @example
 * ```typescript
 * const money = UGX('1.25');// Money({ currency: Currency({ code: 'UGX' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UGX = register('UGX', 0, 'Ugandan Shilling', 'Ugandan shillings', 0, 'USh', 'USh');
/**
 * Uruguayan Peso money factory
 *
 * @example
 * ```typescript
 * const money = UYU('1.25');// Money({ currency: Currency({ code: 'UYU' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UYU = register('UYU', 2, 'Uruguayan Peso', 'Uruguayan pesos', 0, '$U', '$');
/**
 * Uzbekistan Som money factory
 *
 * @example
 * ```typescript
 * const money = UZS('1.25');// Money({ currency: Currency({ code: 'UZS' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const UZS = register('UZS', 0, 'Uzbekistan Som', 'Uzbekistan som', 0, 'UZS', 'UZS');
/**
 * Venezuelan Bolívar money factory
 *
 * @example
 * ```typescript
 * const money = VEF('1.25');// Money({ currency: Currency({ code: 'VEF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const VEF = register('VEF', 2, 'Venezuelan Bolívar', 'Venezuelan bolívars', 0, 'Bs.F.', 'Bs.F.');
/**
 * Vietnamese Dong money factory
 *
 * @example
 * ```typescript
 * const money = VND('1.25');// Money({ currency: Currency({ code: 'VND' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const VND = register('VND', 0, 'Vietnamese Dong', 'Vietnamese dong', 0, '₫', '₫');
/**
 * CFA Franc BEAC money factory
 *
 * @example
 * ```typescript
 * const money = XAF('1.25');// Money({ currency: Currency({ code: 'XAF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const XAF = register('XAF', 0, 'CFA Franc BEAC', 'CFA francs BEAC', 0, 'FCFA', 'FCFA');
/**
 * CFA Franc BCEAO money factory
 *
 * @example
 * ```typescript
 * const money = XOF('1.25');// Money({ currency: Currency({ code: 'XOF' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const XOF = register('XOF', 0, 'CFA Franc BCEAO', 'CFA francs BCEAO', 0, 'CFA', 'CFA');
/**
 * Yemeni Rial money factory
 *
 * @example
 * ```typescript
 * const money = YER('1.25');// Money({ currency: Currency({ code: 'YER' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const YER = register('YER', 0, 'Yemeni Rial', 'Yemeni rials', 0, 'YR', 'ر.ي.‏');
/**
 * South African Rand money factory
 *
 * @example
 * ```typescript
 * const money = ZAR('1.25');// Money({ currency: Currency({ code: 'ZAR' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZAR = register('ZAR', 2, 'South African Rand', 'South African rand', 0, 'R', 'R');
/**
 * Zambian Kwacha money factory
 *
 * @example
 * ```typescript
 * const money = ZMK('1.25');// Money({ currency: Currency({ code: 'ZMK' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZMK = register('ZMK', 0, 'Zambian Kwacha', 'Zambian kwachas', 0, 'ZK', 'ZK');
/**
 * Zimbabwean Dollar money factory
 *
 * @example
 * ```typescript
 * const money = ZWL('1.25');// Money({ currency: Currency({ code: 'ZWL' }), amount: BigDecimal('1') })
 * ```
 * @param amount - The amount of money
 */
export const ZWL = register('ZWL', 0, 'Zimbabwean Dollar', 'Zimbabwean Dollar', 0, 'ZWL$', 'ZWL$');
