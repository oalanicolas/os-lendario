import React from 'react';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsSection
} from '../ops-ui';

export const KnowledgeTiersSection: React.FC = () => {
  return (
    <OpsSection>
      <OpsCard>
        <OpsCardHeader title="Knowledge Tiers" accentColor="text-purple-500" />
        <OpsCardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="layers" className="text-4xl mb-4 opacity-30" />
            <p>Knowledge Tiers section em desenvolvimento</p>
            <Badge variant="outline" className="mt-2">Coming Soon</Badge>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsSection>
  );
};
