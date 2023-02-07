import React from 'react'
import "./../../../dashboard.css";

const  TableSkeleton:React.FC<{data:number}> = ({data=10}) => {
  const tab = Array(data).fill(0)
    
    const row = (
       <tr className='skeleton py-2 '>
        {
          tab.map((row,index)=>{return (<td key={index} > <br/>  </td>)} )
        }
   
    </tr>);
  return (
    <tbody>
       {row}
       {row}
       {row}
       {row}
       {row}
       {row}
       {row}
       {row}




    </tbody>

  )
}

export default TableSkeleton
