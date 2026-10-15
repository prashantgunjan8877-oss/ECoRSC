import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Landmark, Train, Calendar, Flag, ShieldCheck, ChevronRight } from 'lucide-react';

export const HistoryMilestones: React.FC = () => {
  const { lang } = useLanguage();
  const [activeEra, setActiveEra] = useState<number>(0);

  const milestones = [
    {
      year: '1952',
      titleEn: 'Founding of NFIR & The Heritage of Railway Trade Unionism',
      titleHi: 'एन.एफ.आई.आर. की स्थापना एवं रेल श्रमिक आंदोलन का सूत्रपात',
      descEn:
        'In November 1952, under the guidance of national stalwarts and INTUC leaders, the National Federation of Indian Railwaymen (NFIR) was established. NFIR became the democratic voice for railwaymen across Indian Railways, instituting the Permanent Negotiating Machinery (PNM) and Joint Consultative Machinery (JCM) for bilateral dispute resolution.',
      descHi:
        'नवंबर 1952 में राष्ट्रीय नेताओं के सान्निध्य में अखिल भारतीय स्तर पर नेशनल फेडरेशन ऑफ इंडियन रेलवेमेन (NFIR) की स्थापना हुई। इसके माध्यम से भारतीय रेल में पीएनएम और जेसीएम जैसी द्विपक्षीय वार्ता प्रणालियों की मजबूत नींव रखी गई।',
      tag: 'NFIR Genesis',
    },
    {
      year: '1955 - 2002',
      titleEn: 'The Bengal Nagpur (BNR) & South Eastern Railway (SER) Era',
      titleHi: 'बंगाल नागपुर एवं दक्षिण पूर्व रेलवे (SER) का गौरवशाली दौर',
      descEn:
        'Before the creation of East Coast Railway, the railway networks of Khurda Road, Sambalpur, Waltair, and Mancheswar Workshop operated under South Eastern Railway Shramik Congress (SERSC). Cadres waged historic battles for running allowance parity, trackman safety, and the introduction of Productivity Linked Bonus (PLB) in 1979.',
      descHi:
        'ईस्ट कोस्ट रेलवे बनने से पूर्व खुर्दा, वाल्टेयर व संबलपुर क्षेत्र दक्षिण पूर्व रेलवे (SER) के अंतर्गत आते थे। 1979 में उत्पादकता आधारित बोनस (PLB) और रनिंग स्टाफ के भत्तों के लिए ऐतिहासिक संघर्ष लड़े गए।',
      tag: 'Pre-ECoR Heritage',
    },
    {
      year: '2003',
      titleEn: 'Birth of East Coast Railway (ECoR) & Formation of ECORSC',
      titleHi: 'ईस्ट कोस्ट रेलवे (ECoR) का गठन एवं ECORSC का प्रादुर्भाव',
      descEn:
        'On 1st April 2003, the Ministry of Railways carved out the East Coast Railway Zone with Headquarters at Rail Sadan, Chandrasekharpur, Bhubaneswar. To represent the 45,000+ railway workforce across Khurda Road, Waltair, Sambalpur, and Mancheswar Workshop, the East Coast Railway Shramik Congress (ECORSC) was formally constituted as the affiliated zonal organ of NFIR.',
      descHi:
        '1 अप्रैल 2003 को रेल मंत्रालय द्वारा ईस्ट कोस्ट रेलवे जोन की स्थापना की गई (मुख्यालय: रेल सदन, भुवनेश्वर)। इसके साथ ही खुर्दा रोड, वाल्टेयर, संबलपुर और मांचेस्वर कारखाने के कर्मियों के प्रतिनिधित्व हेतु ECORSC का गठन NFIR की संबद्ध इकाई के रूप में हुआ।',
      tag: 'Zonal Constitution',
    },
    {
      year: '2007 & 2013',
      titleEn: 'Resounding Mandate in Democratic Secret Ballot Elections',
      titleHi: 'गुप्त मतदान चुनाव में प्रचंड जनादेश एवं मान्यता',
      descEn:
        'In the historic Secret Ballot Elections conducted by the Ministry of Railways to determine recognized unions, ECORSC secured decisive victories across Khurda Road, Waltair, Sambalpur divisions, and Mancheswar Workshop, officially confirming its status as the premier recognized representative of railwaymen.',
      descHi:
        'रेलवे बोर्ड द्वारा आयोजित ऐतिहासिक गुप्त मतदान (Secret Ballot) चुनावों में ईस्ट कोस्ट रेलवे के कर्मचारियों ने ECORSC को भारी बहुमत देकर मान्यता प्राप्त प्रमुख यूनियन का गौरव प्रदान किया।',
      tag: 'Democratic Mandate',
    },
    {
      year: '2014 - 2020',
      titleEn: '7th CPC Cadre Restructuring & Safety Workers Upgradation',
      titleHi: '7वां वेतन आयोग, संवर्ग पुनर्गठन एवं संरक्षा कर्मचारियों का उन्नयन',
      descEn:
        'Under the leadership of NFIR General Secretary Dr. M. Raghavaiah and ECORSC General Secretary Ashok Kumar Mishra, landmark agreements were finalized in JCM and Zonal PNM: restructuring of Track Maintainers (Grades I, II, III, IV), air-conditioning of running rooms, and risk allowances for open-line staff.',
      descHi:
        'डॉ. एम. राघवैय्या एवं अशोक कुमार मिश्रा के नेतृत्व में ट्रैक मेंटेनरों के 4-स्तरीय संवर्ग पुनर्गठन, रनिंग रूम्स के वातानुकूलन और जोखिम भत्ते की ऐतिहासिक स्वीकृति प्राप्त हुई।',
      tag: 'Cadre Reforms',
    },
    {
      year: 'Present',
      titleEn: 'National Campaign for OPS Restoration & 8th Pay Commission',
      titleHi: 'पुरानी पेंशन (OPS) बहाली एवं 8वें वेतन आयोग का राष्ट्रव्यापी आंदोलन',
      descEn:
        'ECORSC and NFIR stand at the forefront of the Joint Front for Restoration of Old Pension Scheme (JFROPS), conducting nationwide strike ballots, resisting privatization of railway assets, enforcing 10-hour duty caps for Loco Pilots, and pressing the Government for the constitution of the 8th Central Pay Commission.',
      descHi:
        'एनपीएस/यूपीएस के विरुद्ध पुरानी पेंशन (OPS) की ससम्मान बहाली, 8वें वेतन आयोग के गठन और लोको पायलटों के 10 घंटे ड्यूटी नियम के अनुपालन हेतु ECORSC निरंतर आंदोलनरत है।',
      tag: 'Current Crusade',
    },
  ];

  return (
    <div id="history" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>HISTORICAL LEGACY & AFFILIATION</span>
            <span className="text-stone-300">/</span>
            <span>SERVING RAILWAYMEN SINCE 1952</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {lang === 'hi'
              ? 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस: गौरवशाली इतिहास एवं विकास यात्रा'
              : 'Historical Overview: The Heritage & Milestones of ECORSC'}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {lang === 'hi'
              ? 'बंगाल नागपुर रेलवे से लेकर आधुनिक ईस्ट कोस्ट रेलवे तक, सात दशकों के सतत संघर्ष एवं एनएफआईआर (NFIR) सम्बद्धता का प्रमाणिक विवरण।'
              : 'Traced from the historic Bengal Nagpur & South Eastern Railway movements to the establishment of East Coast Railway Zone in 2003 and its unyielding alliance with NFIR.'}
          </p>
        </div>

        {/* 3 Pillar Summary Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              {lang === 'hi' ? 'एनएफआईआर (NFIR) सम्बद्धता' : 'Affiliation with NFIR (ESTD. 1952)'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'नेशनल फेडरेशन ऑफ इंडियन रेलवेमेन (NFIR) भारतीय रेल का सबसे बड़ा एवं मान्यता प्राप्त केंद्रीय महासंघ है, जो INTUC एवं अंतर्राष्ट्रीय परिवहन महासंघ (ITF) से सम्बद्ध है।'
                : 'ECORSC is the recognized zonal affiliate of the National Federation of Indian Railwaymen (NFIR), the premier national federation representing railwaymen at the Railway Board, Department of Personnel and Training (DoPT), and National Council (JCM).'}
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold">
              <Train className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              {lang === 'hi' ? '2003 में जोनल गठन' : 'Foundation on ECoR Formation (2003)'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? '1 अप्रैल 2003 को ईस्ट कोस्ट रेलवे जोन के अस्तित्व में आते ही खुर्दा रोड, वाल्टेयर, संबलपुर और मांचेस्वर कारखाने को मिलाकर ईसीआरएससी का केंद्रीय संगठन गठित किया गया।'
                : 'Carved out when East Coast Railway Zone became operational on April 1, 2003. Unified the proud heritage of South Eastern Railway workers across Odisha, North Coastal Andhra Pradesh, and Chhattisgarh mining sectors.'}
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              {lang === 'hi' ? 'द्विपक्षीय वार्ता व पीएनएम विजय' : 'PNM Forum & Secret Ballot Mandate'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'गुप्त मतदान चुनाव में बहुमत हासिल कर ईसीआरएससी ने महाप्रबंधक (GM) और डीआरएम स्तर पर पीएनएम में हजारों कर्मियों की पदोन्नति, आवास व भत्तों की समस्याएं हल की हैं।'
                : 'Won decisive mandates in Ministry of Railways secret ballot elections. Utilizes Permanent Negotiating Machinery (PNM) to achieve welfare breakthroughs without unnecessary workplace disruption.'}
            </p>
          </div>
        </div>

        {/* Chronological Interactive Milestone Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-lg font-bold text-stone-900">
              {lang === 'hi' ? 'कालक्रमानुसार प्रमुख मील के पत्थर' : 'Chronological Timeline of Struggle & Achievements'}
            </h3>
            <span className="text-xs text-stone-500 font-mono">1952 — 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-xl border border-stone-200 p-5 shadow-xs hover:border-red-600/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-red-700 bg-red-100/70 px-2 py-0.5 rounded-sm">
                      {m.year}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {m.tag}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                    {lang === 'hi' ? m.titleHi : m.titleEn}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lang === 'hi' ? m.descHi : m.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
