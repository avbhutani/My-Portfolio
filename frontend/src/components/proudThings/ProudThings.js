import React from 'react'
import { useCollapse } from 'react-collapsed'
import './ProudThings.css'
function ProudThings(props) {
  const { getToggleProps} = useCollapse()

  return ( 
    <>
    <div className='collapsible'{...getToggleProps()}>
        <div className='collapsible-header' >
        <div className='collapsible-header-text'>
        <span className='collapsible-header-1'>+</span> <span className='collapsible-header-2'>{props.headerContent}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProudThings