import * as React from 'react';
import { useState } from 'react';

interface ICategoryProps {
}

export function Category (props: ICategoryProps) {

    const [state, setstate] = useState();

    return (
      <div className='category'>
        <span>All</span>
        <span>Action</span>
        <span>Thriller</span>
        <span>Comedy</span>
        <span>Sci-fi</span>

      </div>
    );
}
