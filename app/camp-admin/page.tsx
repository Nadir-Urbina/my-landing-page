'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// Simple Badge component inline
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'destructive' | 'outline' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'bg-white text-gray-800 border border-gray-300'
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  )
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CampInterest {
  _id: string
  fullName: string
  email: string
  submittedAt: string
  status: 'info_sent' | 'applied' | 'needs_followup'
  notes?: string
}

interface CampApplication {
  _id: string
  fullName: string
  email: string
  phone: string
  ministry: string
  kingdomLeader: string
  propheticTraining: string
  salvationExperience: string
  viewOfGod: string
  hopesToLearn: string
  howHeardAboutCamp: string
  knowSomeoneInCamp?: string
  potentialCandidates?: string
  financialCommitmentAcknowledged: boolean
  submittedAt: string
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
  reviewNotes?: string
}

export default function CampAdminPage() {
  const [interests, setInterests] = useState<CampInterest[]>([])
  const [applications, setApplications] = useState<CampApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<CampInterest | CampApplication | null>(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('interests')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [interestsResponse, applicationsResponse] = await Promise.all([
        fetch('/api/camp-admin/interests'),
        fetch('/api/camp-admin/applications')
      ])

      if (interestsResponse.ok) {
        const interestsData = await interestsResponse.json()
        setInterests(interestsData)
      }

      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setApplications(applicationsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, type: 'interest' | 'application', newStatus: string, notes?: string) => {
    try {
      const response = await fetch('/api/camp-admin/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          type,
          status: newStatus,
          notes
        }),
      })

      if (response.ok) {
        // Refresh data
        fetchData()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const sendEmail = async () => {
    if (!selectedRecord || !emailSubject || !emailContent) return

    try {
      const response = await fetch('/api/camp-admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedRecord.email,
          subject: emailSubject,
          content: emailContent,
          recordId: selectedRecord._id,
          recordType: 'fullName' in selectedRecord && 'ministry' in selectedRecord ? 'application' : 'interest'
        }),
      })

      if (response.ok) {
        setIsEmailDialogOpen(false)
        setEmailSubject('')
        setEmailContent('')
        setSelectedRecord(null)
        fetchData()
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'info_sent': return 'secondary'
      case 'applied': return 'default'
      case 'needs_followup': return 'destructive'
      case 'pending': return 'secondary'
      case 'under_review': return 'default'
      case 'accepted': return 'default'
      case 'rejected': return 'destructive'
      case 'waitlisted': return 'outline'
      default: return 'secondary'
    }
  }

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return (
      <div className="container max-w-7xl py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CAMP 2025 Admin Dashboard</h1>
        <p className="text-gray-600">Manage CAMP interest requests and applications</p>
      </div>

      <div className="space-y-6">
        {/* Simple Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('interests')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'interests' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Info Requests ({interests.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'applications' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'stats' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Statistics
          </button>
        </div>

        {activeTab === 'interests' && (
          <div className="space-y-4">
          <div className="grid gap-4">
            {interests.map((interest) => (
              <Card key={interest._id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{interest.fullName}</h3>
                      <p className="text-gray-600">{interest.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Requested info: {new Date(interest.submittedAt).toLocaleDateString()}
                      </p>
                      {interest.notes && (
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                          {interest.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant={getStatusBadgeVariant(interest.status)}>
                        {formatStatus(interest.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRecord(interest)
                            setEmailSubject('Follow-up on CAMP 2025 Interest')
                            setEmailContent(`Hi ${interest.fullName},\n\nI hope this email finds you well. I wanted to follow up on your interest in CAMP 2025...\n\nBlessings,\nDr. Joshua Todd`)
                            setIsEmailDialogOpen(true)
                          }}
                        >
                          Email
                        </Button>
                        <select
                          value={interest.status}
                          onChange={(e) => updateStatus(interest._id, 'interest', e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="info_sent">Info Sent</option>
                          <option value="applied">Applied</option>
                          <option value="needs_followup">Needs Follow-up</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
          <div className="grid gap-4">
            {applications.map((application) => (
              <Card key={application._id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{application.fullName}</h3>
                      <p className="text-gray-600">{application.email}</p>
                      <p className="text-gray-600">{application.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Applied: {new Date(application.submittedAt).toLocaleDateString()}
                      </p>
                      <div className="mt-2 text-sm text-gray-700">
                        <p><strong>Ministry:</strong> {application.ministry.substring(0, 100)}...</p>
                        <p><strong>How heard:</strong> {application.howHeardAboutCamp}</p>
                        <p><strong>Financial commitment:</strong> {application.financialCommitmentAcknowledged ? 'Acknowledged' : 'Not acknowledged'}</p>
                      </div>
                      {application.reviewNotes && (
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                          <strong>Review Notes:</strong> {application.reviewNotes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {formatStatus(application.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">View Full</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{application.fullName} - Application Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-sm">
                              <div><strong>Email:</strong> {application.email}</div>
                              <div><strong>Phone:</strong> {application.phone}</div>
                              <div><strong>Ministry:</strong> {application.ministry}</div>
                              <div><strong>Kingdom Leader:</strong> {application.kingdomLeader}</div>
                              <div><strong>Prophetic Training:</strong> {application.propheticTraining}</div>
                              <div><strong>Salvation Experience:</strong> {application.salvationExperience}</div>
                              <div><strong>View of God:</strong> {application.viewOfGod}</div>
                              <div><strong>Hopes to Learn:</strong> {application.hopesToLearn}</div>
                              <div><strong>How Heard About CAMP:</strong> {application.howHeardAboutCamp}</div>
                              {application.knowSomeoneInCamp && (
                                <div><strong>Knows Someone in CAMP:</strong> {application.knowSomeoneInCamp}</div>
                              )}
                              {application.potentialCandidates && (
                                <div><strong>Potential Candidates:</strong> {application.potentialCandidates}</div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRecord(application)
                            setEmailSubject('CAMP 2025 Application Update')
                            setEmailContent(`Dear ${application.fullName},\n\nThank you for your application to CAMP 2025...\n\nBlessings,\nDr. Joshua Todd`)
                            setIsEmailDialogOpen(true)
                          }}
                        >
                          Email
                        </Button>
                        <select
                          value={application.status}
                          onChange={(e) => updateStatus(application._id, 'application', e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="pending">Pending Review</option>
                          <option value="under_review">Under Review</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                          <option value="waitlisted">Waitlisted</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Info Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{interests.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {interests.length > 0 ? Math.round((applications.length / interests.length) * 100) : 0}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {applications.filter(app => app.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedRecord?.fullName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Email content..."
                rows={8}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendEmail}>
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}