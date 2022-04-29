import React from "react";
import { useAuth } from "../../context";

export default function Profile() {
    const {
        auth: {
            user: { email, firstName, lastName },
        },
    } = useAuth();

    return (
        <div className="profile-wrapper">
            <h2>Profile Details</h2>
            <div>
                <div className="profile-wrapper-content">
                    <h4>FirstName: </h4>
                    <h4>{firstName}</h4>
                </div>
                <div className="profile-wrapper-content">
                    <h4>LastName: </h4>
                    <h4>{lastName}</h4>
                </div>
                <div className="profile-wrapper-content">
                    <h4>email: </h4>
                    <h4>{email}</h4>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
