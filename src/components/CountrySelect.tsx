import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const COUNTRIES = [
  { name: 'Switzerland', iso: 'CH', dialCode: '+41', regex: /^\+41[1-9]\d{7,8}$/, example: '+41 79 123 45 67' },
  { name: 'France', iso: 'FR', dialCode: '+33', regex: /^\+33[1-9]\d{8}$/, example: '+33 6 12 34 56 78' },
  { name: 'Belgium', iso: 'BE', dialCode: '+32', regex: /^\+32[1-9]\d{7,8}$/, example: '+32 470 12 34 56' },
  { name: 'Canada', iso: 'CA', dialCode: '+1', regex: /^\+1[2-9]\d{9}$/, example: '+1 416 123 4567' },
  { name: 'USA', iso: 'US', dialCode: '+1', regex: /^\+1[2-9]\d{9}$/, example: '+1 212 123 4567' },
  { name: 'UK', iso: 'GB', dialCode: '+44', regex: /^\+447\d{9}$/, example: '+44 7123 456789' },
  { name: 'Germany', iso: 'DE', dialCode: '+49', regex: /^\+49[1-9]\d{10,11}$/, example: '+49 151 12345678' },
  { name: 'Spain', iso: 'ES', dialCode: '+34', regex: /^\+34[679]\d{8}$/, example: '+34 612 34 56 78' },
  { name: 'Italy', iso: 'IT', dialCode: '+39', regex: /^\+39[3]\d{8,9}$/, example: '+39 312 345 6789' },
  { name: 'Netherlands', iso: 'NL', dialCode: '+31', regex: /^\+31[6]\d{8}$/, example: '+31 6 12345678' },
  { name: 'Sweden', iso: 'SE', dialCode: '+46', regex: /^\+46[7]\d{8}$/, example: '+46 70 123 45 67' },
  { name: 'Australia', iso: 'AU', dialCode: '+61', regex: /^\+61[4]\d{8}$/, example: '+61 412 345 678' },
  { name: 'India', iso: 'IN', dialCode: '+91', regex: /^\+91[6-9]\d{9}$/, example: '+91 98765 43210' },
  { name: 'UAE', iso: 'AE', dialCode: '+971', regex: /^\+971[5]\d{8}$/, example: '+971 50 123 4567' },
  { name: 'Singapore', iso: 'SG', dialCode: '+65', regex: /^\+65[89]\d{7}$/, example: '+65 8123 4567' },
  { name: 'South Africa', iso: 'ZA', dialCode: '+27', regex: /^\+27[6-8]\d{8}$/, example: '+27 82 123 4567' },
  { name: 'Brazil', iso: 'BR', dialCode: '+55', regex: /^\+55[1-9]{2}9\d{8}$/, example: '+55 11 91234-5678' },
  { name: 'Mexico', iso: 'MX', dialCode: '+52', regex: /^\+52\d{10}$/, example: '+52 55 1234 5678' },
  { name: 'Japan', iso: 'JP', dialCode: '+81', regex: /^\+81[789]0\d{8}$/, example: '+81 90 1234 5678' },
  { name: 'Cyprus', iso: 'CY', dialCode: '+357', regex: /^\+357[9]\d{7}$/, example: '+357 99 123456' },
  { iso: "IE", name: "Ireland", dialCode: "+353", example: "+353 87 123 4567", regex: /^\+353[89]\d{7,8}$/ },
  { iso: "GBR", name: "Great Britain", dialCode: "+44", example: "+44 7700 900077", regex: /^\+447\d{9}$/ },
];

export const formatPhoneWithPrefix = (phone: string, dialCode: string) => {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanDialCode = dialCode.replace('+', '');
  
  // If user already typed the prefix without +, or with 00
  let formatted = cleanPhone;
  if (formatted.startsWith('00' + cleanDialCode)) {
    formatted = formatted.substring(2 + cleanDialCode.length);
  } else if (formatted.startsWith(cleanDialCode)) {
    formatted = formatted.substring(cleanDialCode.length);
  }
  
  // Strip leading zero for most European/International formats if any remain
  if (formatted.startsWith('0')) {
    formatted = formatted.substring(1);
  }

  return `+${cleanDialCode}${formatted}`;
};

export const getCRMPhone = (phone: string) => {
  if (phone.startsWith('+')) {
    return `00${phone.substring(1)}`;
  }
  return phone;
};

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white/5 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all hover:bg-white/10">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {COUNTRIES.map((c) => (
          <SelectItem key={c.iso} value={c.iso}>
            {c.name} ({c.dialCode})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
