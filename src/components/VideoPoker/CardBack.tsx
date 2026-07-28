import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CardBackProps {
  className?: string;
  onClick?: () => void;
}

const CardBack: React.FC<CardBackProps> = ({ className = "", onClick }) => {
  return (
    <Card
      className={`w-20 h-28 sm:w-32 sm:h-44 bg-white border-2 border-gray-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-0 h-full relative overflow-hidden">
        {/* Outer decorative border */}
        <div className="absolute inset-1 border-2 border-red-600 rounded-sm">
          {/* Corner decorative elements */}
          <div className="absolute top-0 left-0 w-6 h-6">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-red-600">
              <circle cx="6" cy="6" r="2"/>
              <circle cx="12" cy="6" r="1"/>
              <circle cx="18" cy="6" r="2"/>
              <circle cx="6" cy="12" r="1"/>
              <circle cx="18" cy="12" r="1"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="12" cy="18" r="1"/>
              <circle cx="18" cy="18" r="2"/>
            </svg>
          </div>

          <div className="absolute top-0 right-0 w-6 h-6 rotate-90">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-red-600">
              <circle cx="6" cy="6" r="2"/>
              <circle cx="12" cy="6" r="1"/>
              <circle cx="18" cy="6" r="2"/>
              <circle cx="6" cy="12" r="1"/>
              <circle cx="18" cy="12" r="1"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="12" cy="18" r="1"/>
              <circle cx="18" cy="18" r="2"/>
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 w-6 h-6 rotate-180">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-red-600">
              <circle cx="6" cy="6" r="2"/>
              <circle cx="12" cy="6" r="1"/>
              <circle cx="18" cy="6" r="2"/>
              <circle cx="6" cy="12" r="1"/>
              <circle cx="18" cy="12" r="1"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="12" cy="18" r="1"/>
              <circle cx="18" cy="18" r="2"/>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-6 h-6 -rotate-90">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-red-600">
              <circle cx="6" cy="6" r="2"/>
              <circle cx="12" cy="6" r="1"/>
              <circle cx="18" cy="6" r="2"/>
              <circle cx="6" cy="12" r="1"/>
              <circle cx="18" cy="12" r="1"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="12" cy="18" r="1"/>
              <circle cx="18" cy="18" r="2"/>
            </svg>
          </div>

          {/* Main pattern area */}
          <div className="absolute inset-8 bg-red-600 rounded-sm">
            {/* Diamond pattern */}
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-90">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <pattern id="diamond-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect width="10" height="10" fill="#dc2626"/>
                      <polygon points="5,0 10,5 5,10 0,5" fill="#ef4444" opacity="0.8"/>
                      <circle cx="5" cy="5" r="1" fill="#fca5a5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#diamond-pattern)"/>
                </svg>
              </div>

              {/* Central medallion */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <circle cx="24" cy="24" r="20" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <circle cx="24" cy="24" r="15" fill="none" stroke="#dc2626" strokeWidth="1"/>
                  <circle cx="24" cy="24" r="10" fill="none" stroke="#dc2626" strokeWidth="1"/>
                  <circle cx="24" cy="24" r="5" fill="none" stroke="#dc2626" strokeWidth="1"/>

                  {/* Radiating lines */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const x1 = 24 + Math.cos(angle) * 8;
                    const y1 = 24 + Math.sin(angle) * 8;
                    const x2 = 24 + Math.cos(angle) * 18;
                    const y2 = 24 + Math.sin(angle) * 18;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#dc2626"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Inner border decoration */}
          <div className="absolute inset-6 border border-red-400 rounded-sm opacity-60"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBack;
