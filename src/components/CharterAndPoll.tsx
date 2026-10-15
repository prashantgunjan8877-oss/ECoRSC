import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DEMANDS_CHARTER } from '../data/mockData';
import { Vote, Check, Award, ThumbsUp, Flame } from 'lucide-react';

interface CharterAndPollProps {
  demands?: typeof DEMANDS_CHARTER;
  onVote?: (id: string) => void;
}

export const CharterAndPoll: React.FC<CharterAndPollProps> = ({
  demands = DEMANDS_CHARTER,
  onVote,
}) => {
  const { lang } = useLanguage();
  const [votedId, setVotedId] = useState<string | null>(() => {
    return localStorage.getItem('ecorsc_voted_demand_id');
  });

  const totalVotes = demands.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = (id: string) => {
    if (votedId) return;
    if (onVote) {
      onVote(id);
    }
    setVotedId(id);
    localStorage.setItem('ecorsc_voted_demand_id', id);
  };

  return (
    <div className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>COLLECTIVE BARGAINING CHARTER</span>
            <span className="text-stone-300">/</span>
            <span>MEMBERSHIP POLL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {lang === 'hi'
              ? 'प्रमुख मांग पत्र एवं जोनल पीएनएम रायशुमारी'
              : 'Core Charter of Demands & Zonal PNM Agenda Poll'}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {lang === 'hi'
              ? 'आगामी महाप्रबंधक (जीएम) पीएनएम बैठक में ईसीआरएससी द्वारा उठाए जाने वाले प्रमुख मुद्दों पर अपनी प्राथमिकता तय करें।'
              : 'Cast your vote to shape the high-priority agenda items for the upcoming General Manager (GM) Permanent Negotiating Machinery conference.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Demands List with Vote Affordances (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {demands.map((demand, index) => {
              const votePercentage = Math.round((demand.votes / totalVotes) * 100);
              const isUserChoice = votedId === demand.id;

              return (
                <div
                  key={demand.id}
                  className={`bg-white rounded-xl border p-5 shadow-xs transition-colors ${
                    isUserChoice ? 'border-red-600 ring-1 ring-red-600/20' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-400">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-base font-bold text-stone-900">
                        {lang === 'hi' ? demand.titleHi : demand.titleEn}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                          {votePercentage}%
                        </span>
                        <span className="text-[11px] text-stone-500 block">
                          ({demand.votes.toLocaleString()} votes)
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleVote(demand.id)}
                        disabled={!!votedId}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isUserChoice
                            ? 'bg-red-700 text-white cursor-default'
                            : votedId
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-stone-900 hover:bg-red-700 text-white'
                        }`}
                      >
                        {isUserChoice ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Voted</span>
                          </>
                        ) : (
                          <>
                            <Vote className="w-3.5 h-3.5" />
                            <span>Prioritize</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl mb-3">
                    {lang === 'hi' ? demand.descHi : demand.descEn}
                  </p>

                  {/* Clean progress bar */}
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isUserChoice ? 'bg-red-700' : 'bg-stone-400'
                      }`}
                      style={{ width: `${votePercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Explanatory Box (4 cols) */}
          <div className="lg:col-span-4 bg-stone-900 text-white p-6 rounded-2xl shadow-md space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
              <div className="w-10 h-10 rounded-lg bg-red-700 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Democracy in Unionism</h3>
                <p className="text-xs text-stone-400">Total Valid Votes: {totalVotes.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
              <p>
                Under the guidance of NFIR General Secretary <strong>Dr. M. Raghavaiah</strong> and ECORSC General Secretary <strong>Ashok Kumar Mishra</strong>, our agenda for official bilateral conferences with East Coast Railway administration is strictly derived from direct employee polling.
              </p>
              <div className="p-3 bg-stone-800 rounded-lg border border-stone-700 text-amber-300 text-xs">
                {votedId ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    Thank you, Comrade! Your priority vote has been tallied in the 2026 ECoR Delegate Register.
                  </span>
                ) : (
                  <span>Click "Prioritize" on your primary concern to register your vote.</span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400">
              Standing with all categories: Running, Station, Operating, Track, S&T, Workshop, Accounts & Medical.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
