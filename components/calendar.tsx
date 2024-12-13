'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { CalendarEvent } from '@/types/sanity'

// Remove CSS imports and add styles inline
const calendarStyles = {
  '.fc': {
    '--fc-border-color': '#e2e8f0',
    '--fc-button-bg-color': '#fff',
    '--fc-button-border-color': '#e2e8f0',
    '--fc-button-text-color': '#1a1a1a',
    '--fc-button-hover-bg-color': '#f8fafc',
    '--fc-button-hover-border-color': '#cbd5e1',
    '--fc-button-active-bg-color': '#f1f5f9',
    '--fc-today-bg-color': '#faf5ff',
    '--fc-event-bg-color': '#e879f9',
    '--fc-event-border-color': '#e879f9',
    'maxWidth': '1200px',
    'margin': '0 auto',
  }
}

export function Calendar({ events }: { events: CalendarEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const calendarEvents = events.map(event => ({
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    extendedProps: event,
    className: 'calendar-event'
  }))

  return (
    <div className="calendar-wrapper p-4 bg-white rounded-xl shadow-sm">
      <div style={calendarStyles}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          eventClick={({ event }) => {
            setSelectedEvent(event.extendedProps as CalendarEvent)
          }}
          height="auto"
          dayMaxEvents={3}
        />
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="calendar-dialog">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{selectedEvent && formatDate(selectedEvent.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{selectedEvent?.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Event Type</p>
              <p className="font-medium capitalize">{selectedEvent?.eventType}</p>
            </div>
            <p className="text-muted-foreground">{selectedEvent?.description}</p>
            {selectedEvent?.registrationLink && (
              <Button className="w-full" asChild>
                <a 
                  href={selectedEvent.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Register Now
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 