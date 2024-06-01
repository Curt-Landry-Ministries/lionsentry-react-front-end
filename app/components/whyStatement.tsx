import React from 'react';

interface Statement {
  value: string;
  label: string;
}

const whyStatements: Statement[] = [
  { value: 'family', label: 'I champion family values to strengthen community bonds, nurturing a supportive environment that empowers future generations. I foster community spirit, building strong connections and collaborative networks that enhance collective well-being. I uphold honor and integrity in all my endeavors, ensuring trust and respect pervade every interaction.' },
  { value: 'tradition', label: 'I preserve cultural traditions to maintain our heritage and identity, celebrating the past to inform our future. I encourage personal responsibility to foster a sense of duty and accountability in both individuals and organizations.' },
  { value: 'courage', label: 'I promote courage and resilience, empowering myself and others to face challenges with strength and determination. I value wisdom and insight gained through experience, guiding decisions that shape a prosperous future.' },
  { value: 'service', label: 'I dedicate myself to service, improving lives through a steadfast commitment to help and care for others. I champion innovation to transform challenges into opportunities, driving progress and inspiring change.' },
  { value: 'education', label: 'I foster community spirit, building strong connections and collaborative networks that enhance collective well-being. I value education as a cornerstone of personal and community growth, dedicating myself to lifelong learning and supporting educational initiatives that empower individuals with knowledge and skills for a better future.' },
  { value: 'health', label: 'I promote health and well-being by advocating for policies that improve healthcare access and by participating in community wellness programs that encourage healthy living and mental health awareness. I uphold transparency in governance and business, advocating for clear communication and accountability in all organizational practices to foster trust and engagement among stakeholders' },
  { value: 'leadership', label: 'I embrace leadership roles that allow me to guide and inspire others, fostering a vision of success that motivates teams to achieve their best through effective communication, integrity, and strategic planning. I uphold transparency in governance and business, advocating for clear communication and accountability in all organizational practices to foster trust and engagement among stakeholders.' },
  { value: 'empowerment', label: 'I believe in empowerment by providing tools and opportunities for individuals to take control of their lives and make significant contributions to their communities, promoting self-reliance and confidence among diverse groups.' },
  { value: 'collaboration', label: 'I champion collaboration as a means to achieve greater goals, leveraging collective expertise and resources to tackle complex challenges and create more impactful outcomes. I practice respect in every interaction, recognizing the inherent worth of every individual and nurturing an environment where everyone can feel valued and included.' },
  { value: 'innovation', label: ' I prioritize adaptability, staying responsive to changes in the environment and industry by continually updating my skills and strategies to stay relevant and effective.I push the boundaries of innovation by exploring new technologies and methodologies that disrupt traditional models and pave the way for groundbreaking advancements in various fields.' },
  { value: 'perseverance', label: 'I hold integrity as the bedrock of my actions, ensuring that my deeds consistently reflect my ethical beliefs and that I remain honest and forthright in all my professional and personal interactions. I embody perseverance, facing challenges head-on with a steadfast spirit and unwavering commitment to overcome obstacles and achieve long-term goals despite setbacks.' },
  { value: 'inspiration', label: 'I seek to inspire others by leading by example, sharing my experiences and insights to motivate and uplift those around me, creating a ripple effect of positive change and innovation.' }
];


const randomStatement = whyStatements[Math.floor(Math.random() * whyStatements.length)];

export default function WhyStatement() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Your Why Statement Has Been Generated!</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">We used the responses from your quiz to generate this:</p>
   
        <blockquote className="text-lg p-10 mt-8 mb-4 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto">{randomStatement.label}</blockquote>
    </div>
       </div>
  </div>
  )
}