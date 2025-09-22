"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { strings } from "@/app/utils/strings";
import { submitRSVP } from "../actions/submitRSVP";
import { useToast } from "@/hooks/use-toast";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [accompany, setAccompany] = useState<string | null>(null);
  const [attendance, setAttendance] = useState("yes");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrors({ name: "El nombre es obligatorio" });
      return;
    }
    if (!phone) {
      setErrors({ phone: "Se requiere número de teléfono" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("accompany", accompany || "0");
    formData.append("attendance", attendance);

    setIsLoading(true);
    const result = await submitRSVP(formData);

    if (result.success) {
      toast({
        title: "Success",
        description: strings.thankYouMessage,
      });
      // Reset form
      setName("");
      setPhone("");
      setAccompany(null);
      setAttendance("yes");
      setErrors({});
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
      if (result.error) {
        if (result.error.code === "23505") {
          setErrors({ phone: "Phone number already exists" });
        }
      }
    }
    setIsLoading(false);
  };

  const openGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(strings.eventLocation);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">{strings.title}</h1>
      <p className="mb-6">{strings.description}</p>

      <div className="mb-6">
        <Label>{strings.eventDateLabel}</Label>
        <Calendar
          mode="single"
          selected={new Date(strings.eventDate)}
          className="rounded-md border flex flex-col items-center"
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
        />

        <div className="mt-4 w-full h-64 relative">
          <iframe
            title="Event Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              strings.eventLocation
            )}&output=embed`}
          ></iframe>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              strings.eventLocation
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
          >
            <span className="sr-only">View on Google Maps</span>
          </a>
        </div>

        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={openGoogleMaps}
            className="w-full"
          >
            <MapPin className="mr-2" />
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{strings.nameLabel}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">{strings.emailLabel}</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
          <Input
            id="accompany"
            type="number"
            min="0"
            value={accompany || ""}
            onChange={(e) => setAccompany(e.target.value)}
          />
        </div>
        <div>
          <Label>{strings.rsvpLabel}</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">{strings.noOption}</Label>
            </div>
          </RadioGroup>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Sending..." : strings.submitButton}
        </Button>
      </form>
    </div>
  );
}
