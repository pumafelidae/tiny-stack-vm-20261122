import f from'node:fs'
let{MAKEFUN_INPUT_DIR:A='/input',MAKEFUN_OUTPUT_DIR:B='/output'}=process.env,o
function run(p,q){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),s=0,c=0,u=0,t=0,i=0
o=[]
try{for(;;){
if(t==1e6)throw 10
if(u<0|u>=p.length)throw 9
let k=p[u],m=k==1?1:k==2?4:k>47&&k<52?2:0
if(u+m>=p.length)throw 9
t++
let x=u+1+m
u=x
if(k>15&&k<35&&k!=23&&k!=27){
if(s<2)throw 2
let b=D[--s],a=D[s-1]
if(!b&&(k==19|k==20|k==21|k==22))throw 4
let r
if(k==16)r=(a+b)|0
else if(k==17)r=(a-b)|0
else if(k==18)r=Math.imul(a,b)
else if(k==19)r=a==-2147483648&&b==-1?a:(a/b)|0
else if(k==20)r=b==-1?0:a%b|0
else if(k==21)r=Math.floor((a>>>0)/(b>>>0))|0
else if(k==22)r=(a>>>0)%(b>>>0)|0
else if(k==24)r=a&b
else if(k==25)r=a|b
else if(k==26)r=a^b
else if(k==28)r=a<<(b&31)
else if(k==29)r=a>>(b&31)
else if(k==30)r=(a>>>(b&31))|0
else if(k==32)r=a==b?1:0
else if(k==33)r=a<b?1:0
else r=a>>>0<b>>>0?1:0
D[s-1]=r
continue}
switch(k){
case 0:return 0
case 1:if(s==256)throw 3;D[s++]=(p[x-1]<<24)>>24;break
case 2:if(s==256)throw 3;D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break
case 3:if(s<1)throw 2;s--;break
case 4:if(s<1)throw 2;if(s==256)throw 3;D[s]=D[s-1];s++;break
case 5:if(s<2)throw 2;let z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break
case 6:if(s<2)throw 2;if(s==256)throw 3;D[s]=D[s-2];s++;break
case 7:if(s<3)throw 2;let w=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=w;break
case 23:if(s<1)throw 2;D[s-1]=-D[s-1]|0;break
case 27:if(s<1)throw 2;D[s-1]=~D[s-1];break
case 48:u=x+(((p[x-2]|p[x-1]<<8)<<16)>>16);break
case 49:case 50:if(s<1)throw 2;let v=D[--s];if((k==49)==(v==0))u=x+(((p[x-2]|p[x-1]<<8)<<16)>>16);break
case 51:if(c==64)throw 7;C[c++]=x;u=p[x-2]|p[x-1]<<8;break
case 52:if(c==0)throw 8;u=C[--c];break
case 64:if(s<1)throw 2;let a=D[s-1];if(a<0|a>255)throw 6;D[s-1]=M[a];break
case 65:if(s<2)throw 2;let d=D[s-1],e=D[s-2];if(d<0|d>255)throw 6;s-=2;M[d]=e;break
case 80:if(s<1)throw 2;let g=''+D[s-1];if(o.length+g.length>65536)throw 11;s--;o.push(...Buffer.from(g));break
case 81:if(s<1)throw 2;if(o.length>65535)throw 11;o.push(D[--s]&255);break
case 82:if(s==256)throw 3;D[s++]=i<q.length?q[i++]:-1;break
case 83:if(s<1)throw 2;return D[--s]&255
default:throw 5}}}catch(y){return y|0}}
for(let d of f.readdirSync(A)){
let p=f.readFileSync(A+'/'+d+'/program.bin'),q=f.readFileSync(A+'/'+d+'/input.bin'),e=run(p,q)
f.mkdirSync(B+'/'+d,{recursive:!0})
f.writeFileSync(B+'/'+d+'/stdout.bin',Buffer.from(o))
f.writeFileSync(B+'/'+d+'/exit.txt',e+'\n')}
