import React from 'react';
import logo from '@/assets/vm.png';

export default function ProjectInfo({ title, subtitle }) {
  return (
    <section className="mt-20 text-center">
      <picture className="block w-24 mx-auto">
        <img className="block w-full" src={logo} />
      </picture>
      <h1 className="mt-8">{title}</h1>
      <h3 className="mt-8 text-gray-600">{subtitle}</h3>
    </section>
  );
}
