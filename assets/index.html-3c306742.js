import{_ as c,r as p,o as l,c as i,a as n,w as t,b as a,d as s,e as u}from"./app-551765ad.js";const d={},r=a("h1",{id:"vue-3-vxdatabs",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#vue-3-vxdatabs","aria-hidden":"true"},"#"),s(" Vue 3 vxdaTabs")],-1),k=a("p",null,"Simple yet smart tabs",-1),v=a("h2",{id:"instalation",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#instalation","aria-hidden":"true"},"#"),s(" Instalation")],-1),m=a("div",{class:"language-bash","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"npm"),s(),a("span",{class:"token function"},"install"),s(` vxda-tabs
`)])])],-1),g=a("div",{class:"language-bash","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"yarn"),s(),a("span",{class:"token function"},"add"),s(` vxda-tabs
`)])])],-1),b=u(`<h2 id="simple-example" tabindex="-1"><a class="header-anchor" href="#simple-example" aria-hidden="true">#</a> simple example</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> vxdaTabs<span class="token punctuation">,</span> vxdaTabsItem <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vxda-tabs&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// add some basic styling</span>
<span class="token keyword">import</span> <span class="token string">&#39;vxda-tabs/dist/vxda-tabs-ts.css&#39;</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VxdaTabs</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VxdaTabItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>my tab name<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
          ... some content goes here
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>VxdaTabItem</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>VxdaTabs</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function h(_,x){const e=p("CodeGroupItem"),o=p("CodeGroup");return l(),i("div",null,[r,k,v,n(o,null,{default:t(()=>[n(e,{title:"NPM",active:""},{default:t(()=>[m]),_:1}),n(e,{title:"YARN"},{default:t(()=>[g]),_:1})]),_:1}),b])}const V=c(d,[["render",h],["__file","index.html.vue"]]);export{V as default};