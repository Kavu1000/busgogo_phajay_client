'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userApi } from '@/lib/api';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ShieldCheckIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

interface ProfileData {
    _id: string;
    username: string;
    email: string;
    phone?: string;
    role?: string;
    isActive?: boolean;
}

export default function ProfilePage() {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const fetchProfile = useCallback(async () => {
        if (!token) return;
        try {
            setIsLoading(true);
            const response = await userApi.getProfile();
            if (response.data.success) {
                setProfileData(response.data.data);
                setFormData({
                    username: response.data.data.username || '',
                    email: response.data.data.email || '',
                    phone: response.data.data.phone || '',
                    password: ''
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile' });
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatePayload: Record<string, string> = {
                username: formData.username,
                email: formData.email,
                phone: formData.phone
            };
            if (formData.password) {
                updatePayload.password = formData.password;
            }
            const response = await userApi.updateProfile(updatePayload);
            if (response.data.success) {
                setProfileData(response.data.data);
                setIsEditing(false);
                setMessage({ type: 'success', text: 'Profile updated successfully' });
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            console.error('Error updating profile:', err);
            setMessage({
                type: 'error',
                text: e.response?.data?.message || 'Failed to update profile'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="h-24 w-24 bg-white rounded-full p-1 shadow-lg">
                                <div className="h-full w-full bg-blue-100 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-12 w-12 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profileData?.username}</h1>
                                <p className="text-gray-500 capitalize">{profileData?.role || 'Customer'}</p>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                    <span>Edit Profile</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center space-x-2 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                    <span>Cancel</span>
                                </button>
                            )}
                        </div>

                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                {message.type === 'success' ? <CheckIcon className="h-5 w-5" /> : <XMarkIcon className="h-5 w-5" />}
                                <span>{message.text}</span>
                            </div>
                        )}

                        {!isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4 text-gray-700">
                                        <div className="bg-gray-100 p-3 rounded-xl">
                                            <UserIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Username</p>
                                            <p className="font-semibold">{profileData?.username}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 text-gray-700">
                                        <div className="bg-gray-100 p-3 rounded-xl">
                                            <EnvelopeIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-semibold">{profileData?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4 text-gray-700">
                                        <div className="bg-gray-100 p-3 rounded-xl">
                                            <PhoneIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone Number</p>
                                            <p className="font-semibold">{profileData?.phone || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 text-gray-700">
                                        <div className="bg-gray-100 p-3 rounded-xl">
                                            <ShieldCheckIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Account Status</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                                        <input
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900">Security Note</h3>
                            <p className="text-blue-700 text-sm mt-1">
                                Your personal details are stored securely. We never share your data with third parties without your explicit consent.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
