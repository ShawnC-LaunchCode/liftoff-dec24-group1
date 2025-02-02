import React from 'react'

export default function Home() {
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        const fetchUserData = async () => {
          const response = await fetch("http://localhost:8080/user/IBbCK-fV0FfqYzmMjeCr1", {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              const data = await response.json();
              setUserData(data);
          } else {
              console.error("Failed to fetch user data");
          }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h2>User Information</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
