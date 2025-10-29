import React from 'react';

function TextareaField({ icon: Icon, name, value, onChange, rows = 3, ...props }) {
  return (
    <div>
  
      <div className="relative">
        {Icon && (
          <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder='Enter the Here'
          {...props}
          className={`w-full min-h-[100px] pr-3 py-2 border border-slate-200 rounded-lg bg-black sticky text-slate-900 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:border-transparent ${
            Icon ? 'pl-10' : 'pl-3'
          }`}
         
        />
       
      </div>
    </div>
  );
}

export default TextareaField;
