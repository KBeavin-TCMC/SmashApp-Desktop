import React from 'react';

import AppTabs from '../../components/layout/AppTabs';
import AppTitle from '../../components/layout/AppTitle';

const CrmScreen = () => {

    return (
        <div className='tabs'>
            <AppTitle title='CRM' />
            <AppTabs />
        </div>
    );
}

export default CrmScreen;