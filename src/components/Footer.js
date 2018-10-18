import React from 'react';
import FilterLink from './FilterLink';

 const Footer = () =>
 {
 return (
   <p>
        Show:
           {' '}
           <FilterLink 
               filter='all'  > All </FilterLink>  {/* updating the name of the filter to display it as path in browser */}
           {', '}
           <FilterLink  
               filter='active' > Active </FilterLink>
           {', '}
           <FilterLink 
               filter='completed' > Completed </FilterLink>
       </p>
 );
 };

 export default Footer;