import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, Train, Moon, Clock, Building, Download, HelpCircle } from 'lucide-react';

export const AllowanceCalculator: React.FC = () => {
  const { lang, t } = useLanguage();
  const [calcMode, setCalcMode] = useState<'running' | 'nda' | 'ota' | 'hra'>('running');

  // Common Parameters
  const [basicPay, setBasicPay] = useState<number>(35400);
  const [daPercent, setDaPercent] = useState<number>(53); // 53% current DA

  // Running Staff Parameters
  const [runningRole, setRunningRole] = useState<'lp_mail' | 'lp_goods' | 'alp' | 'guard_mail' | 'guard_goods'>('lp_goods');
  const [monthlyKm, setMonthlyKm] = useState<number>(3600);
  const [alkDays, setAlkDays] = useState<number>(2); // Allowance in Lieu of Kilometre (160km per day for LP)
  const [outstationHours, setOutstationHours] = useState<number>(48);

  // Night Duty Parameters
  const [nightHours, setNightHours] = useState<number>(42);

  // Overtime Parameters
  const [otHours, setOtHours] = useState<number>(24);
  const [rosterClassification, setRosterClassification] = useState<'intensive' | 'continuous'>('continuous');
  const [tpaAmount, setTpaAmount] = useState<number>(3600);

  // HRA Parameters
  const [cityClass, setCityClass] = useState<'X' | 'Y' | 'Z'>('Y'); // Bhubaneswar & Vizag are 'Y'

  // Calculations
  const daAmount = Math.round((basicPay * daPercent) / 100);

  // 1. Running Staff Calculation
  const kmaRates: Record<string, { ratePer100Km: number; additionalAllowance: number; label: string }> = {
    lp_mail: { ratePer100Km: 530, additionalAllowance: 2250, label: 'Loco Pilot (Mail/Express)' },
    lp_goods: { ratePer100Km: 520, additionalAllowance: 1125, label: 'Loco Pilot (Goods)' },
    alp: { ratePer100Km: 391, additionalAllowance: 0, label: 'Assistant Loco Pilot (ALP)' },
    guard_mail: { ratePer100Km: 525, additionalAllowance: 1125, label: 'Mail/Express Guard' },
    guard_goods: { ratePer100Km: 485, additionalAllowance: 0, label: 'Goods Guard / Train Manager' },
  };

  const selectedRole = kmaRates[runningRole];
  const kmAllowance = Math.round((monthlyKm / 100) * selectedRole.ratePer100Km);
  // ALK = 160km per day of headquarters non-running duty
  const alkAllowance = Math.round(((alkDays * 160) / 100) * selectedRole.ratePer100Km);
  const outstationAllowance = Math.round(outstationHours * 24); // Outstation detention rate
  const totalRunningAllowances =
    kmAllowance + alkAllowance + outstationAllowance + selectedRole.additionalAllowance;

  // 2. Night Duty Calculation
  // 7th CPC Formula: Hourly NDA = (Basic Pay + DA) / 200
  const ndaHourlyRate = (basicPay + daAmount) / 200;
  const totalNdaAmount = Math.round(ndaHourlyRate * nightHours);

  // 3. Overtime Allowance Calculation
  // Hourly OTA = (Basic Pay + DA + TPA) / 104 (for 104-hr fortnight)
  const divisor = rosterClassification === 'intensive' ? 90 : 104;
  const otaHourlyRate = (basicPay + daAmount + tpaAmount) / divisor;
  const totalOtaAmount = Math.round(otaHourlyRate * otHours);

  // 4. HRA & TPTA Calculation
  // As per 7th CPC (DA > 50%): X = 30%, Y = 20%, Z = 10%
  const hraRatePercent = cityClass === 'X' ? 30 : cityClass === 'Y' ? 20 : 10;
  const hraAmount = Math.round((basicPay * hraRatePercent) / 100);
  const tpaWithDa = Math.round(tpaAmount * (1 + daPercent / 100));

  return (
    <div className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>7TH CPC OFFICIAL FORMULAE</span>
            <span className="text-stone-300">/</span>
            <span>RAILWAY BOARD CIRCULARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('calcTitle')}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {t('calcSubtitle')}
          </p>
        </div>

        {/* Global Basic Pay & DA Bar */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {lang === 'hi' ? 'मूल वेतन (Basic Pay - Level 1-9)' : '7th CPC Basic Pay (₹)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-mono">₹</span>
                <input
                  type="number"
                  step="100"
                  value={basicPay}
                  onChange={(e) => setBasicPay(Number(e.target.value) || 0)}
                  className="pl-7 pr-3 py-1.5 w-36 text-sm font-semibold font-mono bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {lang === 'hi' ? 'महंगाई भत्ता (DA %)' : 'Dearness Allowance (DA %)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={daPercent}
                  onChange={(e) => setDaPercent(Number(e.target.value) || 0)}
                  className="px-3 py-1.5 w-24 text-sm font-semibold font-mono bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
                <span className="ml-1 text-xs text-stone-500 font-mono">%</span>
              </div>
            </div>

            <div className="text-xs text-stone-600 pt-3 sm:pt-0">
              <span className="text-stone-400 block">Calculated DA Amount</span>
              <strong className="text-stone-900 font-mono text-sm tabular-nums">
                ₹{daAmount.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div className="text-xs text-stone-500 bg-white px-3 py-2 rounded-lg border border-stone-200 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Updated with Railway Board 53% DA Notification.</span>
          </div>
        </div>

        {/* Tab Controls for 4 Calculators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-stone-100 rounded-lg mb-8">
          <button
            type="button"
            onClick={() => setCalcMode('running')}
            className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'running'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-red-700" />
            <span>{t('calcTabRunning')}</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('nda')}
            className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'nda'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-blue-700" />
            <span>{t('calcTabNDA')}</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('ota')}
            className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'ota'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('calcTabOTA')}</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('hra')}
            className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'hra'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('calcTabHRA')}</span>
          </button>
        </div>

        {/* CALCULATOR 1: RUNNING STAFF */}
        {calcMode === 'running' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Train className="w-4 h-4 text-red-700" />
                <span>Running Staff Kilometre & Special Allowance Parameters</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Designation / Running Cadre
                  </label>
                  <select
                    value={runningRole}
                    onChange={(e) => setRunningRole(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  >
                    <option value="lp_mail">Loco Pilot (Mail/Express)</option>
                    <option value="lp_goods">Loco Pilot (Goods)</option>
                    <option value="alp">Assistant Loco Pilot (ALP)</option>
                    <option value="guard_mail">Train Manager / Guard (Mail/Exp)</option>
                    <option value="guard_goods">Train Manager / Guard (Goods)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Monthly Kilometres Logged (km)
                  </label>
                  <input
                    type="number"
                    step="50"
                    value={monthlyKm}
                    onChange={(e) => setMonthlyKm(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Allowance in Lieu of Kilometrage (ALK Days)
                  </label>
                  <input
                    type="number"
                    value={alkDays}
                    onChange={(e) => setAlkDays(Number(e.target.value) || 0)}
                    placeholder="Days of shed/pilot/rest duties"
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">160 km credit per day</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Outstation Detention Hours (&gt;16 hrs rest)
                  </label>
                  <input
                    type="number"
                    value={outstationHours}
                    onChange={(e) => setOutstationHours(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-semibold">Railway Board Running Allowance Rule Reference:</div>
                <p>
                  Order No. E(P&A)II-2016/RS-40. KMA rate for {selectedRole.label} is ₹{selectedRole.ratePer100Km} per 100 km. 30% Pay element benefit added for retirement/pension calculation.
                </p>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Estimated Monthly Running Earnings
                </span>
                <span className="text-xs text-stone-400 font-mono">7th CPC</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Kilometrage Allowance ({monthlyKm} km):</span>
                  <span className="font-mono tabular-nums text-white font-semibold">₹{kmAllowance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">ALK ({alkDays * 160} equivalent km):</span>
                  <span className="font-mono tabular-nums text-white font-semibold">₹{alkAllowance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Outstation Detention Pay:</span>
                  <span className="font-mono tabular-nums text-white font-semibold">₹{outstationAllowance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Additional Running Allowance:</span>
                  <span className="font-mono tabular-nums text-white font-semibold">₹{selectedRole.additionalAllowance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs text-amber-400">Total Running Allowance:</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
                  ₹{totalRunningAllowances.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 bg-stone-800 rounded-lg text-xs text-stone-300 space-y-1">
                <div className="flex justify-between text-stone-400">
                  <span>Gross Pay with Basic & DA:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    ₹{(basicPay + daAmount + totalRunningAllowances).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 2: NIGHT DUTY ALLOWANCE (NDA) */}
        {calcMode === 'nda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Moon className="w-4 h-4 text-blue-700" />
                <span>Night Duty Allowance (NDA) Hourly Computation</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Night Hours Worked in Month (Between 22:00 to 06:00 hrs)
                </label>
                <input
                  type="number"
                  value={nightHours}
                  onChange={(e) => setNightHours(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Formula prescribed by DoPT & Ministry of Railways: Hourly Rate = (Basic Pay + DA) / 200
                </span>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-2">
                <div className="font-semibold text-stone-900">Step-by-step Rule Derivation:</div>
                <div className="font-mono text-stone-800">
                  Hourly Rate = (₹{basicPay} + ₹{daAmount}) / 200 = ₹{ndaHourlyRate.toFixed(2)}/hour
                </div>
                <p className="text-stone-600">
                  Applicable to Station Masters, Pointsmen, Loco Pilots, Guards, Gatemen, Carriage & Wagon staff, and Electricians performing rostered night duties.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl shadow-md space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold pb-3 border-b border-stone-800">
                NDA Computation Summary
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Basic + 53% DA:</span>
                  <span className="font-mono tabular-nums text-white">₹{(basicPay + daAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Rate per Night Hour:</span>
                  <span className="font-mono tabular-nums text-white">₹{ndaHourlyRate.toFixed(2)} / hr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Claimed Night Hours:</span>
                  <span className="font-mono tabular-nums text-white">{nightHours} hrs</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs text-amber-400">Total Monthly NDA Payable:</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
                  ₹{totalNdaAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 3: OVERTIME ALLOWANCE (OTA) */}
        {calcMode === 'ota' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Overtime Allowance (OTA) under Hours of Employment Regulations (HOER)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Duty Roster Classification
                  </label>
                  <select
                    value={rosterClassification}
                    onChange={(e) => setRosterClassification(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  >
                    <option value="continuous">Continuous (104 hrs fortnight)</option>
                    <option value="intensive">Intensive (90 hrs fortnight)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Overtime Hours Performed (Fortnight/Month)
                  </label>
                  <input
                    type="number"
                    value={otHours}
                    onChange={(e) => setOtHours(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Transport Allowance Element (TPA in ₹)
                </label>
                <input
                  type="number"
                  value={tpaAmount}
                  onChange={(e) => setTpaAmount(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                Formula: Hourly Rate = (Basic Pay + DA + TPA) / {divisor}. Standard HOER rules mandate overtime payment at twice the ordinary rate of wages beyond statutory ceiling.
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl shadow-md space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold pb-3 border-b border-stone-800">
                OTA Payable Summary
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Basic + DA + TPA:</span>
                  <span className="font-mono tabular-nums text-white">₹{(basicPay + daAmount + tpaAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Calculated Hourly OT Rate:</span>
                  <span className="font-mono tabular-nums text-white">₹{otaHourlyRate.toFixed(2)} / hr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Overtime Hours:</span>
                  <span className="font-mono tabular-nums text-white">{otHours} hrs</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs text-amber-400">Total Overtime Allowance:</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
                  ₹{totalOtaAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 4: HRA & TRANSPORT ALLOWANCE */}
        {calcMode === 'hra' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>House Rent Allowance (HRA) & Transport Allowance (TPTA)</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Station / City Category (East Coast Railway)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCityClass('Y')}
                    className={`p-3 rounded-lg border text-left cursor-pointer ${
                      cityClass === 'Y'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-xs">Y-Class (20%)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Bhubaneswar, Cuttack, Visakhapatnam</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCityClass('Z')}
                    className={`p-3 rounded-lg border text-left cursor-pointer ${
                      cityClass === 'Z'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-xs">Z-Class (10%)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Khurda, Puri, Rayagada, SBP, Titlagarh</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCityClass('X')}
                    className={`p-3 rounded-lg border text-left cursor-pointer ${
                      cityClass === 'X'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-xs">X-Class (30%)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Delhi / Metros deputation</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Base Transport Allowance (TPA Level Rate)
                </label>
                <input
                  type="number"
                  value={tpaAmount}
                  onChange={(e) => setTpaAmount(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-md focus:bg-white text-stone-900"
                />
                <span className="text-[11px] text-stone-500 mt-0.5 block">
                  Level 1-2: ₹1,350; Level 3-8: ₹3,600; Level 9+: ₹7,200. DA applies automatically.
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl shadow-md space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold pb-3 border-b border-stone-800">
                Monthly Allowances Breakdown
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Basic Pay:</span>
                  <span className="font-mono tabular-nums text-white">₹{basicPay.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Dearness Allowance ({daPercent}%):</span>
                  <span className="font-mono tabular-nums text-white">₹{daAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">House Rent Allowance ({hraRatePercent}%):</span>
                  <span className="font-mono tabular-nums text-white">₹{hraAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-300">Transport Allowance (with DA):</span>
                  <span className="font-mono tabular-nums text-white">₹{tpaWithDa.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs text-amber-400">Total Monthly Salary Estimate:</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
                  ₹{(basicPay + daAmount + hraAmount + tpaWithDa).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
