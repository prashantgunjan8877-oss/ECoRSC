import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS_INFO, UNION_LEADERS } from '../data/mockData';
import { DivisionId, DivisionInfo, UnionLeader } from '../types';
import { Building2, Phone, Mail, MapPin, Users, Send, CheckCircle2, Shield } from 'lucide-react';

interface DivisionsDirectoryProps {
  divisions?: DivisionInfo[];
  leaders?: UnionLeader[];
}

export const DivisionsDirectory: React.FC<DivisionsDirectoryProps> = ({
  divisions = DIVISIONS_INFO,
  leaders = UNION_LEADERS,
}) => {
  const { lang, t } = useLanguage();
  const [selectedDivisionId, setSelectedDivisionId] = useState<DivisionId>('KUR');
  const [contactModalDivision, setContactModalDivision] = useState<DivisionInfo | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderStation, setSenderStation] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const currentDiv = divisions.find((d) => d.id === selectedDivisionId) || divisions[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMessage) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactModalDivision(null);
      setSenderName('');
      setSenderStation('');
      setSenderMessage('');
    }, 2000);
  };

  return (
    <div className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>TERRITORIAL JURISDICTION & LEADERSHIP</span>
            <span className="text-stone-300">/</span>
            <span>EAST COAST RAILWAY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('divisionsTitle')}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {t('divisionsSubtitle')}
          </p>
        </div>

        {/* Division Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {divisions.map((div) => (
            <button
              key={div.id}
              type="button"
              onClick={() => setSelectedDivisionId(div.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedDivisionId === div.id
                  ? 'border-red-700 bg-red-50/70 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-xs text-red-700 bg-red-100/70 px-2 py-0.5 rounded-sm">
                  {div.code}
                </span>
                <span className="text-[11px] font-mono tabular-nums text-stone-500">
                  {div.membersCount.toLocaleString()} Cadres
                </span>
              </div>
              <div className="font-semibold text-xs text-stone-900 truncate">
                {lang === 'hi' ? div.nameHi : div.nameEn}
              </div>
            </button>
          ))}
        </div>

        {/* Active Division Detailed Card */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
                  Division Secretariat
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'hi' ? currentDiv.nameHi : currentDiv.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {lang === 'hi' ? currentDiv.jurisdictionHi : currentDiv.jurisdictionEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-medium">Divisional Secretary</span>
                  <div className="font-bold text-stone-900 text-sm">{currentDiv.divisionalSecretary}</div>
                  <div className="text-stone-500 flex items-center gap-1.5 pt-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{currentDiv.contactPhone}</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-medium">Divisional President</span>
                  <div className="font-bold text-stone-900 text-sm">{currentDiv.divisionalPresident}</div>
                  <div className="text-stone-500 flex items-center gap-1.5 pt-1">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{currentDiv.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">
                  Major Crew Depots, Stations & Workshops Under Jurisdiction:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDiv.keyDepots.map((depot, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-white border border-stone-200 rounded-md text-stone-700 font-medium"
                    >
                      {depot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <MapPin className="w-5 h-5 text-red-700 shrink-0" />
                <div>
                  <div className="text-xs text-stone-500">Official Postal Address</div>
                  <div className="text-xs font-semibold text-stone-900 leading-snug">
                    {currentDiv.headquarters}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                  <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                    {currentDiv.branchesCount}
                  </div>
                  <div className="text-[11px] text-stone-500">Active Branches</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                  <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                    {currentDiv.membersCount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-500">Enrolled Members</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setContactModalDivision(currentDiv)}
                className="w-full py-2.5 px-4 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>Message Divisional Coordinator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Central Union & NFIR Stalwarts Section */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-stone-900">
              {lang === 'hi' ? 'केंद्रीय एवं राष्ट्रीय नेतृत्व' : 'Central & NFIR Apex Leadership'}
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Guiding Indian railwaymen through historic collective bargaining, Joint Consultative Machinery (JCM), and parliamentary advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, idx) => {
              const achievements = (lang === 'hi' ? leader.achievementsHi : leader.achievementsEn) || leader.achievementsEn || [];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Header Banner / Photo Strip */}
                    <div className="bg-linear-to-r from-stone-900 via-red-950 to-stone-900 p-5 text-white flex items-center gap-4">
                      {leader.photoUrl ? (
                        <img
                          src={leader.photoUrl}
                          alt={leader.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0 bg-stone-800"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-red-800 text-amber-300 border-2 border-amber-400 flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
                          {leader.name.charAt(0)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-1">
                          {leader.body || 'Central ECORSC'}
                        </span>
                        <h4 className="font-bold text-white text-base leading-tight truncate">
                          {leader.name}
                        </h4>
                        <p className="text-xs text-red-200 font-medium mt-0.5 leading-snug">
                          {lang === 'hi' ? leader.roleHi : leader.roleEn}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* About / Bio */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                          {lang === 'hi' ? 'परिचय व अनुभव (About)' : 'Leadership Profile'}
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {lang === 'hi' ? leader.bioHi : leader.bioEn}
                        </p>
                      </div>

                      {/* Key Achievements */}
                      {achievements && achievements.length > 0 && (
                        <div className="pt-3 border-t border-stone-100">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5 mb-2">
                            <span>⭐</span>
                            <span>{lang === 'hi' ? 'प्रमुख यूनियन उपलब्धियां व योगदान' : 'Key Union Achievements'}</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-stone-700">
                            {achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                <span className="leading-snug">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{leader.location}</span>
                    </span>
                    {leader.phone && (
                      <a
                        href={`tel:${leader.phone}`}
                        className="text-red-700 hover:text-red-900 font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{leader.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Contact Modal */}
        {contactModalDivision && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-stone-200 overflow-hidden">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Contact {contactModalDivision.code} Division
                  </h3>
                  <p className="text-xs text-stone-400">
                    To: {contactModalDivision.divisionalSecretary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactModalDivision(null)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {messageSent ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">Message Transmitted</h4>
                  <p className="text-xs text-stone-600">
                    Your memorandum has been forwarded to the {contactModalDivision.nameEn} secretariat phone desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Satyabrata Jena"
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Station / Depot / PF Number
                    </label>
                    <input
                      type="text"
                      value={senderStation}
                      onChange={(e) => setSenderStation(e.target.value)}
                      placeholder="e.g. Cuttack / PF5321099"
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Urgent Note / Inquiry
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Specify your inquiry, quarters issue, or transfer guidance..."
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setContactModalDivision(null)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
