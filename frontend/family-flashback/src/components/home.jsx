import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [userData, setUserData] = useState(null);
    const [treeStats, setTreeStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch("http://localhost:8080/user/current", {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                // Fetch tree statistics
                const statsResponse = await fetch("http://localhost:8080/persons/stats", {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (userResponse.ok && statsResponse.ok) {
                    const userData = await userResponse.json();
                    const statsData = await statsResponse.json();
                    setUserData(userData);
                    setTreeStats(statsData);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Family Flashback</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* User Profile Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-12">
                        <div className="flex items-center gap-6">
                            <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-3xl text-white font-semibold">
                                    {userData?.name?.charAt(0) || '?'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white mb-2">{userData?.name}</h2>
                                <p className="text-indigo-100">{userData?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">
                            {treeStats?.totalMembers || 0}
                        </div>
                        <div className="text-gray-600">Total Family Members</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="text-4xl font-bold text-emerald-600 mb-2">
                            {treeStats?.generations || 0}
                        </div>
                        <div className="text-gray-600">Generations</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="text-4xl font-bold text-violet-600 mb-2">
                            {treeStats?.livingMembers || 0}
                        </div>
                        <div className="text-gray-600">Living Members</div>
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/tree" 
                        className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 
                            hover:shadow-xl transition-all duration-200 hover:border-indigo-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-indigo-500 text-white flex items-center justify-center
                                group-hover:bg-indigo-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">View Family Tree</h3>
                                <p className="text-gray-600">Explore your family connections in an interactive tree view</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/blog" 
                        className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 
                            hover:shadow-xl transition-all duration-200 hover:border-indigo-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-violet-500 text-white flex items-center justify-center
                                group-hover:bg-violet-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Blog</h3>
                                <p className="text-gray-600">Read and share family stories and memories</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
