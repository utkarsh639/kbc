let optionD=document.getElementById("optionD");
let container =document.querySelector(".container");
let timeh = document.getElementById("timeh");
let question= document.getElementById("question");
let optionA=document.getElementById("optionA");
let optionB=document.getElementById("optionB");
let optionC=document.getElementById("optionC");
let progress=document.querySelector(".progress");
let result= document.querySelector(".result");
let resulth2=document.getElementById("result-h2");
let options=[optionA,optionB,optionC,optionD];
let Ans;
let time=30;
let interval,interval1;
let i=0;
let data;
let prize =0;
let width=0;

fetch('kbc.json')
.then(data=>{
   return data.json();
})
.then(data1=>{
        data=data1;
       
        addevent(options);
        interval=setInterval(()=>{
         time=time-1;
         getquestion(data,i);
         },1000);

        interval1=setInterval(()=>{
           if(width==2000){
              clearInterval(interval1);
           }
           else{
                width=width+1;
               progress.style.width=width+"px";
              }
        },28.5);
});


function getquestion(data,i){
  question.innerText= data[i].q;
  optionA.innerText=data[i].options[0].optionA;
  optionB.innerText=data[i].options[1].optionB;
  optionC.innerText=data[i].options[2].optionC;
  optionD.innerText=data[i].options[3].optionD;
  Ans=data[i].Ans;
  if(time<0){
       clearInterval(interval);
       clearInterval(interval1);
       container.style.display="none";
       resulth2.innerText="You lost ! Your total wining prize is : "+prize;
       result.style.display="flex";
       progress.style.backgroundColor="#ff165d";
       progress.style.width="81vw"
      }
  else{
        timeh.innerText=time;
      }
  }

function addevent(a){
   a.forEach(element => {
      element.addEventListener('click',(e)=>{
         if(e.target.innerText==Ans && i<5){
            prize=prize+1000;
            i=i+1;
            time=30;
            width=0;
            progress.style.width=width;
            console.log(i);
            getquestion(data,i);
         }
         else if(e.target.innerText==Ans && i==5){
            console.log(e.target.innerText,Ans);
            container.style.display="none";
            resulth2.innerText="You lost ! Your total wining prize is :  INR 6000";
            result.style.display="flex";
            result.style.height="60vh";
            progress.style.display="none";
           
         }
         else if(e.target.innerText!=Ans){
            console.log("else");
            container.style.display="none";
            resulth2.innerText="You lost ! Your total wining prize is :  "+prize;
            result.style.display="flex";
            result.style.height="60vh";
            progress.style.display="none";
         }
      });
      
   });
}
