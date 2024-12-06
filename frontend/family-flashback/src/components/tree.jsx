import React from 'react';
import Tree from 'react-d3-tree';

const familyData = {
    name: 'Family',
    children: [
        {
            name: 'Mother'
        },
        {
            name: 'Father'
        },
        {
            name: 'Your Name',
            children: [
                {
                    name: 'Child 1',
                    children: [
                        { name: 'Grandson 1' },
                        { name: 'Grandson 2' }
                    ]
                },
                {
                    name: 'Child 2',
                    children: [
                        { name: 'Granddaughter 3' },
                        { name: 'Grandson 4' }
                    ]
                }
            ]
        }
    ]
};

export default function FamilyTree() {
    return (
        <>
        <main className="w-full h-full bg-green-200 p-5">
            <h1>Family Flashback</h1>
            <div style={{ 
                height: '500px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <Tree 
                    data={familyData} 
                    translate={{ x: 100, y: 100 }}
                    nodeSize={{ x: 100, y: 100 }}
                    orientation="vertical"
                />
            </div>
        </main>
        </>
    );
}