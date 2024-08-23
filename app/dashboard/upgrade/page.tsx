"use client";

import React from 'react';
import Head from 'next/head';
import { FC } from 'react';

const Upgrade: FC = () => {
    return (
        <>
            <Head>
                <title>Upgrade Page</title>
                <meta name="description" content="Upgrade to our latest version" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Upgrade to Our Latest Version!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        We have just released new features and improvements. Upgrade now to take advantage of them!
                    </p>
                    <a
                        href="/upgrade.jpg" // Replace with the actual path to your file
                        download="upgrade.jpg"
                        className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                    >
                        Download Now
                    </a>
                </div>
            </main>
        </>
    );
};

export default Upgrade;
