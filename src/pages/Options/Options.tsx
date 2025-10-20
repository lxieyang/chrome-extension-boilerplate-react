import React from 'react';
import './Options.css';

interface OptionsProps {
    title: string;
}

const Options: React.FC<OptionsProps> = ({ title }: OptionsProps) => {
    return <div className='OptionsContainer'>{title} Page</div>;
};

export default Options;
