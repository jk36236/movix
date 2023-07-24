import React,{useState} from 'react'
import './style.scss'

const SwitchTabs = ({data,onTabChange}) => {//destructure values which u passed as prop in switchtab omponenet in trrending component

  //states
  const [selectedTab,setSelectedTab]=useState(0)//isme hume index pass krna hai selected tab ka
  const [left,setLeft]=useState(0);//for background animation

const activeTab=(tab,index)=>{
  setLeft(index * 100);//width of tab is 100,we have to mve it forward
  setTimeout(() => {
    setSelectedTab(index);//jis bhi tab  par click karenge uska index set kiya hai
  }, 300);
  onTabChange(tab,index);
}
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {/* //we will get the tabs from data by looping over it */}
        {data.map((tab,index)=>(
          //conditional class, tabitem by default rahegi and if selectedtab==index then add active class
          <span key={index} className={`tabItem ${selectedTab ===index ? "active": ""}`}
          onClick={()=>activeTab(tab,index)}>
            {/* //iske andar jo humne day,week pas kra tha vo aa jayega */}
            {tab}
          </span>
        ))}

        <span className='movingBg' style={{left}}/>
      </div>
    </div>
  )
}

export default SwitchTabs