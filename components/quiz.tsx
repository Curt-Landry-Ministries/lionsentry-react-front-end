"use client"
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const q1_options = [
    { value: 'communication', label: 'Communication' },
    { value: 'competition', label: 'Competition' },
    { value: 'creativity', label: 'Creativity' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'adaptability', label: 'Adaptability' },
    { value: 'problem-solving', label: 'Problem Solving' },
    { value: 'critical-thinking', label: 'Critical Thinking' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: 'work-ethic', label: 'Work Ethic' },
    { value: 'interpersonal-skills', label: 'Interpersonal Skills' },
    { value: 'resilience', label: 'Resilience' },
    { value: 'attention-to-detail', label: 'Attention to Detail' },
    { value: 'time-management', label: 'Time Management' },
    { value: 'emotional-intelligence', label: 'Emotional Intelligence' },
    { value: 'analytical-skills', label: 'Analytical Skills' },
    { value: 'self-motivation', label: 'Self Motivation' },
    { value: 'organization', label: 'Organization' },
    { value: 'patience', label: 'Patience' },
    { value: 'perseverance', label: 'Perseverance' },
    { value: 'confidence', label: 'Confidence' },
    // Add more options as needed
];

const  q2_options = [
    { value: 'people-are-good', label: 'People are inherently good' },
    { value: 'change-is-possible', label: 'Change is always possible' },
    { value: 'technology-improves-lives', label: 'Technology generally improves lives' },
    { value: 'education-is-key', label: 'Education is key to success' },
    { value: 'hard-work-pays-off', label: 'Hard work pays off' },
    { value: 'everyone-is-equal', label: 'Everyone is equal and deserves equal opportunities' },
    { value: 'culture-enriches-lives', label: 'Cultural diversity enriches lives' },
    { value: 'sustainability-is-essential', label: 'Sustainability is essential for future generations' },
    { value: 'cooperation-over-competition', label: 'Cooperation is more important than competition' },
    { value: 'freedom-of-expression', label: 'Freedom of expression is fundamental' },
    { value: 'justice-prevails', label: 'Justice eventually prevails' },
    { value: 'peace-is-possible', label: 'Peace is possible' },
    { value: 'innovation-drives-progress', label: 'Innovation drives progress' },
    { value: 'respect-for-nature', label: 'Respect for nature is vital' },
    { value: 'global-interdependence', label: 'We are all interdependent' },
    { value: 'spirituality-is-important', label: 'Spirituality plays an important role in human life' },
    { value: 'happiness-is-a-choice', label: 'Happiness is a choice' },
    { value: 'the-world-is-beautiful', label: 'The world is a beautiful place' },
    { value: 'life-is-a-learning-process', label: 'Life is a continuous learning process' },
    // Add more options as needed
];

const q3_options = [
    { value: 'spending-time-with-family', label: 'Spending time with family' },
    { value: 'being-in-nature', label: 'Being in nature' },
    { value: 'pursuing-passions', label: 'Pursuing passions' },
    { value: 'learning-new-things', label: 'Learning new things' },
    { value: 'solving-challenges', label: 'Solving challenges' },
    { value: 'creating-art', label: 'Creating art' },
    { value: 'playing-music', label: 'Playing music' },
    { value: 'traveling-the-world', label: 'Traveling the world' },
    { value: 'reading-books', label: 'Reading books' },
    { value: 'practicing-spirituality', label: 'Practicing spirituality' },
    { value: 'helping-others', label: 'Helping others' },
    { value: 'engaging-in-sports', label: 'Engaging in sports' },
    { value: 'building-projects', label: 'Building projects' },
    { value: 'participating-in-theater', label: 'Participating in theater' },
    { value: 'conducting-research', label: 'Conducting research' },
    { value: 'cooking-new-recipes', label: 'Cooking new recipes' },
    { value: 'meditating', label: 'Meditating' },
    { value: 'watching-films', label: 'Watching films' },
    { value: 'writing-stories', label: 'Writing stories' },
    { value: 'dancing', label: 'Dancing' },
    // Add more options as needed
];

const q4_options = [
    { value: 'completing-a-project', label: 'Completing a challenging project' },
    { value: 'achieving-a-goal', label: 'Achieving a personal goal' },
    { value: 'helping-others', label: 'Helping others' },
    { value: 'learning-new-skills', label: 'Learning new skills' },
    { value: 'overcoming-obstacles', label: 'Overcoming obstacles' },
    { value: 'making-a-difference', label: 'Making a difference in the community' },
    { value: 'being-recognized', label: 'Being recognized for my work' },
    { value: 'working-with-team', label: 'Working effectively with a team' },
    { value: 'spending-time-with-loved-ones', label: 'Spending quality time with loved ones' },
    { value: 'exploring-new-places', label: 'Exploring new places' },
    { value: 'expressing-creativity', label: 'Expressing creativity through art or writing' },
    { value: 'achieving-financial-security', label: 'Achieving financial security' },
    { value: 'practicing-faith', label: 'Practicing and growing in my faith' },
    { value: 'teaching-others', label: 'Teaching and inspiring others' },
    { value: 'living-healthy', label: 'Living a healthy lifestyle' },
    { value: 'solving-complex-problems', label: 'Solving complex problems' },
    { value: 'enjoying-hobbies', label: 'Enjoying my hobbies' },
    { value: 'connecting-with-nature', label: 'Connecting with nature' },
    { value: 'embracing-new-challenges', label: 'Embracing new challenges' },
    // Add more options as needed
];

const q5_options = [
    { value: 'improve-education', label: 'Improve education' },
    { value: 'promote-peace', label: 'Promote peace' },
    { value: 'enhance-community-wellbeing', label: 'Enhance community wellbeing' },
    { value: 'support-mental-health', label: 'Support mental health' },
    { value: 'drive-innovation', label: 'Drive innovation' },
    { value: 'protect-environment', label: 'Protect the environment' },
    { value: 'encourage-arts-and-culture', label: 'Encourage arts and culture' },
    { value: 'advocate-for-human-rights', label: 'Advocate for human rights' },
    { value: 'foster-inclusivity', label: 'Foster inclusivity and diversity' },
    { value: 'promote-sustainable-living', label: 'Promote sustainable living' },
    { value: 'advance-scientific-research', label: 'Advance scientific research' },
    { value: 'support-entrepreneurship', label: 'Support entrepreneurship' },
    { value: 'strengthen-democracy', label: 'Strengthen democracy' },
    { value: 'develop-technology-for-good', label: 'Develop technology for good' },
    { value: 'inspire-others', label: 'Inspire others to achieve their dreams' },
    { value: 'reduce-poverty', label: 'Reduce poverty' },
    { value: 'improve-public-health', label: 'Improve public health' },
    { value: 'enhance-global-cooperation', label: 'Enhance global cooperation' },
    { value: 'educate-on-climate-change', label: 'Educate on climate change' },
    // Add more options as needed
];

const q6_options = [
    { value: 'innovators', label: 'Innovators - for pushing the boundaries of what is possible and bringing new ideas to life' },
    { value: 'leaders', label: 'Leaders - for their vision and ability to guide others towards a common goal' },
    { value: 'activists', label: 'Activists - for their commitment to change and justice in social, environmental, or political causes' },
    { value: 'artists', label: 'Artists - for their creative expressions that inspire and challenge societal norms' },
    { value: 'scientists', label: 'Scientists - for their contributions to understanding the world and solving complex problems' },
    { value: 'educators', label: 'Educators - for their dedication to teaching and shaping future generations' },
    { value: 'philanthropists', label: 'Philanthropists - for their generosity and efforts to improve the wellbeing of humanity' },
    { value: 'healthcare-professionals', label: 'Healthcare professionals - for their care and commitment to saving lives and improving health' },
    { value: 'athletes', label: 'Athletes - for their perseverance and excellence in pushing physical and mental boundaries' },
    { value: 'writers', label: 'Writers - for their ability to articulate profound truths and stories that resonate with people' },
    { value: 'entrepreneurs', label: 'Entrepreneurs - for their courage to take risks and their impact on the economy and society' },
    { value: 'humanitarians', label: 'Humanitarians - for their efforts to provide aid and improve conditions for people in crisis' },
    { value: 'spiritual-leaders', label: 'Spiritual leaders - for their guidance on moral values and personal growth' },
    { value: 'historical-figures', label: 'Historical figures - for their lasting impact on the world and lessons they provide' },
    // Add more options as needed
];

const q7_options = [
    { value: 'poverty', label: 'Poverty - to improve living conditions and economic opportunities for all' },
    { value: 'inequality', label: 'Inequality - to promote fairness and equal opportunities across society' },
    { value: 'climate-change', label: 'Climate change - to mitigate the impacts of global warming and promote sustainability' },
    { value: 'health-disparities', label: 'Health disparities - to bridge the gap in healthcare access and outcomes' },
    { value: 'education-gaps', label: 'Education gaps - to provide quality education to underserved communities' },
    { value: 'mental-health', label: 'Mental health - to destigmatize and expand access to mental health services' },
    { value: 'violence', label: 'Violence - to create safer communities through prevention and intervention strategies' },
    { value: 'corruption', label: 'Corruption - to advocate for transparency and integrity in governance' },
    { value: 'food-security', label: 'Food security - to ensure everyone has access to nutritious food' },
    { value: 'animal-welfare', label: 'Animal welfare - to protect animals from cruelty and exploitation' },
    { value: 'disaster-relief', label: 'Disaster relief - to improve emergency responses and aid recovery efforts' },
    { value: 'technological-disruption', label: 'Technological disruption - to manage the social and economic impacts of new technologies' },
    { value: 'cultural-preservation', label: 'Cultural preservation - to maintain and celebrate cultural heritage' },
    { value: 'water-scarcity', label: 'Water scarcity - to secure clean water resources for communities' },
    { value: 'human-rights', label: 'Human rights - to defend and expand human rights protections' },
    // Add more options as needed
];

const q8_options = [
    { value: 'freedom-of-speech', label: 'Freedom of Speech - Defending the right to express opinions openly' },
    { value: 'environmental-protection', label: 'Environmental Protection - Advocating for policies to protect and preserve the natural world' },
    { value: 'animal-rights', label: 'Animal Rights - Ensuring humane treatment and protection for all animals' },
    { value: 'social-justice', label: 'Social Justice - Striving for equality and justice within society' },
    { value: 'educational-equity', label: 'Educational Equity - Promoting equal access to quality education for all' },
    { value: 'public-health', label: 'Public Health - Supporting initiatives that improve health outcomes for the community' },
    { value: 'religious-freedom', label: 'Religious Freedom - Upholding the right to practice one’s religion freely' },
    { value: 'gender-equality', label: 'Gender Equality - Advocating for equal rights and opportunities regardless of gender' },
    { value: 'civil-rights', label: 'Civil Rights - Protecting and expanding the rights of marginalized communities' },
    { value: 'economic-justice', label: 'Economic Justice - Working towards fairness in economic policies and practices' },
    { value: 'digital-privacy', label: 'Digital Privacy - Safeguarding personal information and privacy online' },
    { value: 'access-to-healthcare', label: 'Access to Healthcare - Ensuring everyone has access to necessary medical services' },
    { value: 'sustainable-development', label: 'Sustainable Development - Promoting responsible and sustainable growth' },
    { value: 'disability-rights', label: 'Disability Rights - Advocating for accessibility and rights for disabled individuals' },
    { value: 'peace-advocacy', label: 'Peace Advocacy - Promoting peaceful resolutions and diplomacy over conflict' },
    { value: 'fiscal-responsibility', label: 'Fiscal Responsibility - Advocating for balanced budgets and reduced government debt' },
    { value: 'national-security', label: 'National Security - Ensuring the safety and security of the nation through strong defense policies' },
    { value: 'second-amendment-rights', label: 'Second Amendment Rights - Supporting the right to keep and bear arms' },
    { value: 'pro-life', label: 'Pro-Life - Advocating for the rights of the unborn' },
    { value: 'traditional-values', label: 'Traditional Values - Preserving traditional cultural and family values' },
    { value: 'small-government', label: 'Small Government - Promoting limited government involvement in personal and economic matters' },
    { value: 'free-market-principles', label: 'Free Market Principles - Supporting free enterprise and opposition to excessive regulation' },
    { value: 'law-and-order', label: 'Law and Order - Upholding strict adherence to law enforcement and justice' },
    // Add more options as needed
];



export default function () {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Purpose Statement Generator</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You can select as many options as you would like for each question, as well as type in any custom response. Choose the options that feel the most intuitive to you.</p>
          </div>
          <div className="space-y-6">

    {/* Question 1 */}
          <div>
      <h3 className="text-lg font-medium">What are your biggest strengths?</h3>
      <div className="mt-3">
      <CreatableSelect
  options={q1_options}
  isMulti
  className="basic-multi-select"
  classNamePrefix="select"
/>
      </div>
    </div>

     {/* Question 2 */}
     <div>
      <h3 className="text-lg font-medium">What do you believe about the world?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q2_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

         {/* Question 3 */}
         <div>
      <h3 className="text-lg font-medium">What makes you come alive?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q3_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

     {/* Question 4 */}
     <div>
      <h3 className="text-lg font-medium">When have you felt the most fulfilled and satisfied?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q4_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

      {/* Question 5 */}
      <div>
      <h3 className="text-lg font-medium">What impact do you want to make on the world or in the lives of others?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q5_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

          {/* Question 6 */}
          <div>
      <h3 className="text-lg font-medium">Who are the people you admire the most and why?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q6_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

          {/* Question 7 */}
          <div>
      <h3 className="text-lg font-medium">What are the challenges or hardships that you feel most driven to solve or overcome?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q7_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>

          {/* Question 8 */}
          <div>
      <h3 className="text-lg font-medium">What is a cause or belief that you would stand up for no matter what?</h3>
      <div className="mt-3">
        <CreatableSelect
          options={q8_options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>


    <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-start" data-aos="zoom-y-out" data-aos-delay="300">
  <a className="btn text-white cyan-blue-bg hover:bg-gray-800 w-full sm:w-auto" href="/statement">Submit</a>
  <a className="btn text-white azure-blue-bg hover:bg-gray-800 w-full sm:w-auto sm:ml-6" href="/">Clear Form</a>
</div>
            
          </div>
        </div>
      </div>
    )
  }