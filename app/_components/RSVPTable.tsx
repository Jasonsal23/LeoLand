"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface RSVP {
  id: string;
  name: string;
  phone: string;
  accompany: number;
  attendance: string; 
}

interface RSVPTableProps {
  data: RSVP[];
}

export function RSVPTable({ data }: RSVPTableProps) {
  const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter((rsvp) =>
      rsvp.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // 👇 Calculate total guests attending
  const totalAttending = React.useMemo(() => {
    return data.reduce((sum, rsvp) => {
      if (rsvp.attendance.toLowerCase() === "yes") {
        return sum + (rsvp.accompany || 1); 
      }
      return sum;
    }, 0);
  }, [data]);

  return (
    <div>
      {/* Live counter */}
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="font-semibold">
          Total Guests Attending: {totalAttending}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Number of Guests</TableHead>
              <TableHead>Attending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell>{rsvp.name}</TableCell>
                  <TableCell>{rsvp.phone}</TableCell>
                  <TableCell>{rsvp.accompany || "/"}</TableCell>
                  <TableCell>{rsvp.attendance}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
