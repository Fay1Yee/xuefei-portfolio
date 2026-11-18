export function PersonalCard({React:R,store,profile,projects,id,width,height}) {
  const {phase,send,module:current,select}=store();
  const [copyState,setCopyState]=R.useState('Copy address');
  const ref=R.useRef(null);
  const el=R.createElement;
  R.useEffect(()=>{if(phase==='reading')ref.current?.querySelector('.pc-return')?.focus({preventScroll:true});},[phase]);
  const photo='/xuefei-portfolio/en/scene/assets/profile/xuefei-portrait.webp';
  const project=(index,cls='')=>el('figure',{className:`pc-project ${cls}`,key:index},el('img',{src:projects[index].cover,alt:projects[index].title,loading:'eager'}),el('figcaption',null,el('span',null,projects[index].no),projects[index].title));
  const chips=items=>el('div',{className:'pc-chips'},...items.map(x=>el('span',{key:x},x)));
  const stamp=el('span',{className:'pc-stamp','aria-hidden':true},'✳');
  const configs=[
    {label:'Research',title:'Find the question.',description:'Start with people, tasks and the context around them. Turn observations into a clear design direction.',methods:['Interviews','Journey mapping','System framing'],tools:['Figma','Miro'],samples:[0,1],steps:['Observe','Connect','Frame']},
    {label:'Prototype',title:'Make it tangible.',description:'Use physical forms and working systems to explore an idea through what people can see, hold and try.',methods:['Form studies','Physical models','Hardware prototyping'],tools:['Blender','Figma','Creative coding'],samples:[4,5],steps:['Sketch','Build','Try']},
    {label:'Interaction',title:'Give ideas a response.',description:'Connect interfaces, movement, sound and feedback. Make actions and choices visible through the interaction.',methods:['Interface design','Real-time feedback','Interaction flows'],tools:['TouchDesigner','Max/MSP','Figma'],samples:[3,2],steps:['Act','Respond','Refine']}
  ];
  let body;
  if(id==='skills'){
    const skill=configs[current]||configs[0];
    body=el(R.Fragment,null,
      el('div',{className:'pc-section-title'},el('div',null,el('span',{className:'pc-eyebrow'},'02 / WORKING PRACTICE'),el('h1',null,'Ways of making.')),stamp),
      el('div',{className:'pc-tabs',role:'tablist','aria-label':'Skill areas'},...configs.map((s,index)=>el('button',{key:s.label,type:'button',role:'tab',id:`skill-tab-${index}`,'aria-selected':index===current,'aria-controls':'skill-panel',tabIndex:index===current?0:-1,onClick:()=>select(index),onKeyDown:e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const n=(current+(e.key==='ArrowRight'?1:2))%3;select(n);ref.current?.querySelector(`#skill-tab-${n}`)?.focus();}}},el('span',null,`0${index+1}`),s.label))),
      el('div',{className:'pc-skill-panel',id:'skill-panel',role:'tabpanel','aria-labelledby':`skill-tab-${current}`},
        el('div',{className:'pc-skill-copy'},el('h2',null,skill.title),el('p',null,skill.description),el('div',{className:'pc-process','aria-label':'Design process'},...skill.steps.map((s,index)=>el('div',{key:s},el('span',null,`0${index+1}`),el('b',null,s)))),el('span',{className:'pc-label'},'METHODS'),chips(skill.methods),el('span',{className:'pc-label'},'TOOLS'),chips(skill.tools)),
        el('div',{className:'pc-skill-evidence'},el('span',{className:'pc-label'},'IN THE WORK'),...skill.samples.map(i=>project(i))))
    );
  }else if(id==='about'){
    body=el(R.Fragment,null,
      el('div',{className:'pc-section-title'},el('div',null,el('span',{className:'pc-eyebrow'},'01 / A PERSONAL INTRODUCTION'),el('h1',null,'Hello, I’m Faye.')),stamp),
      el('div',{className:'pc-about-grid'},
        el('div',{className:'pc-portrait'},el('span',{className:'pc-photo-label'},'FAYE ZHOU / HANGZHOU'),el('img',{src:photo,alt:'Portrait of Faye Zhou'}),el('span',{className:'pc-photo-sticker'},'A WORK IN PROGRESS ↗')),
        el('div',{className:'pc-about-copy'},el('h2',null,'Objects, interfaces,\nand the people in between.'),el('p',null,'I study Industrial Design at China Academy of Art. My work moves between physical objects, interactive systems and human–AI experiences.'),el('dl',null,el('div',null,el('dt',null,'EDUCATION'),el('dd',null,'China Academy of Art')),el('div',null,el('dt',null,'FIELD'),el('dd',null,'Industrial Design')),el('div',null,el('dt',null,'BASED IN'),el('dd',null,'Hangzhou, China'))),chips(['Interaction','Physical prototyping','HCI']))),
      el('div',{className:'pc-work-strip'},...([0,1,4].map(i=>project(i)))))
  }else{
    async function copy(){try{await navigator.clipboard.writeText(profile.email);setCopyState('Copied ✓');}catch{setCopyState('Use the email link');}}
    body=el(R.Fragment,null,
      el('div',{className:'pc-section-title'},el('div',null,el('span',{className:'pc-eyebrow'},'03 / LET’S KEEP IN TOUCH'),el('h1',null,'Start a conversation.')),stamp),
      el('div',{className:'pc-contact-grid'},
        el('div',{className:'pc-mail-graphic','aria-hidden':true},el('svg',{viewBox:'0 0 320 250',fill:'none'},el('rect',{x:28,y:64,width:246,height:148,rx:2,fill:'#c1edff',stroke:'#252525',strokeWidth:2}),el('path',{d:'M28 66L150 156L274 66M28 212L112 132M274 212L190 132',stroke:'#252525',strokeWidth:2}),el('circle',{cx:266,cy:45,r:35,fill:'#78a9be',stroke:'#252525',strokeWidth:2}),el('path',{d:'M248 58L283 25M255 25H283V51',stroke:'white',strokeWidth:3})),el('span',null,'DESIGN / RESEARCH / NEW POSSIBILITIES')),
        el('div',{className:'pc-contact-copy'},el('span',{className:'pc-label'},'A DIRECT LINE'),el('a',{className:'pc-email',href:`mailto:${profile.email}`},profile.email),el('p',null,'For a question, a conversation about the work, or a new possibility — say hello.'),el('div',{className:'pc-actions'},el('a',{href:`mailto:${profile.email}`},'Write an email ↗'),el('button',{type:'button',onClick:copy},copyState)))),
      el('div',{className:'pc-contact-proof'},el('span',{className:'pc-label'},'A FEW CONVERSATION STARTERS'),el('div',{className:'pc-work-strip'},...([0,3,4].map(i=>project(i))))))
  }
  return el('section',{ref,className:`spatial-sheet personal-card pc-${id}`,style:{width,height},role:'dialog','aria-modal':true,'aria-label':`${id} card`,tabIndex:-1,onKeyDown:e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();send('BACK');}}},
    el('header',{className:'pc-top'},el('span',null,'FAYE ZHOU / PORTFOLIO 2026'),el('button',{className:'pc-return',type:'button',onClick:()=>send('BACK')},'Return card ×')),
    el('div',{className:'pc-scroll'},body),
    el('footer',{className:'pc-bottom'},el('span',null,'INDUSTRIAL DESIGN · INTERACTION · HCI'),el('span',null,'01 — 03 / PERSONAL COLLECTION')));
}
