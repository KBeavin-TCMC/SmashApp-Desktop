import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { VOrder } from '../../types/orders';

interface Props {
    vorder: VOrder;
    cell: string;
    onDrag: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

const ScheduledBlock: React.FC<Props> = ({ vorder, cell, onDrag }) => {
    const [isShown, setIsShown] = useState(false);
    const history = useHistory();

    return (
        <div key={vorder.order_id}
            id={vorder.order_id}
            className="schedule-vorder"
            onDragStart={(e) => onDrag(e, vorder.order_id)}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            draggable={true}
        >
            {isShown && (
                <div className='schedule-vorder-tooltip'>
                    <div className='schedule-vorder-tooltip-header'>
                        <p>{vorder.account_id}</p>
                        <span onClick={() => history.push(`orders/orders/${vorder._id}`)}>Details</span>
                    </div>
                    <p>Scheduled: {cell}</p>
                    <p>{vorder.name}</p>
                    <p>Status: {vorder.status}</p>
                    <p>Total: {vorder.total}</p>
                    <p>{vorder.location_id}</p>
                    <p>{vorder.summary}</p>
                </div>
            )}
        </div>
    )
}

export default ScheduledBlock;