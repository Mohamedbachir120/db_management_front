import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "./../../../dashboard.css";

function TableSkeleton() {
    const row = ( <tr className='skeleton py-2 '>
    <td > <br /> </td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td></tr>);
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
