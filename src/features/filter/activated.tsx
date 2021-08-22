import React from 'react'

interface activatedProps {
    activatedDict: Record<string, boolean>;
}

export const Activated: React.FC<activatedProps> = ({ activatedDict }) => {
     return (
        <div className="activated">
            {Object.keys(activatedDict).map((key) => (
            <div className="activatedOption" key={key}>
                {key}
            </div>
            ))}
        </div>
     );
}