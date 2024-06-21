import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmationQuestion } from 'src/database/commands/questions/confirmation.question';
import { WorkspaceManagerModule } from 'src/engine/workspace-manager/workspace-manager.module';
import { DataSourceModule } from 'src/engine/metadata-modules/data-source/data-source.module';
import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { WorkspaceModule } from 'src/engine/core-modules/workspace/workspace.module';
import { DataSeedWorkspaceCommand } from 'src/database/commands/data-seed-dev-workspace.command';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { WorkspaceSyncMetadataModule } from 'src/engine/workspace-manager/workspace-sync-metadata/workspace-sync-metadata.module';
import { ObjectMetadataModule } from 'src/engine/metadata-modules/object-metadata/object-metadata.module';
import { StartDataSeedDemoWorkspaceCronCommand } from 'src/database/commands/data-seed-demo-workspace/crons/start-data-seed-demo-workspace.cron.command';
import { StopDataSeedDemoWorkspaceCronCommand } from 'src/database/commands/data-seed-demo-workspace/crons/stop-data-seed-demo-workspace.cron.command';
import { WorkspaceAddTotalCountCommand } from 'src/database/commands/workspace-add-total-count.command';
import { DataSeedDemoWorkspaceCommand } from 'src/database/commands/data-seed-demo-workspace/data-seed-demo-workspace-command';
import { DataSeedDemoWorkspaceModule } from 'src/database/commands/data-seed-demo-workspace/data-seed-demo-workspace.module';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { UpdateMessageChannelVisibilityEnumCommand } from 'src/database/commands/update-message-channel-visibility-enum.command';
import { FieldMetadataEntity } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { WorkspaceCacheVersionModule } from 'src/engine/metadata-modules/workspace-cache-version/workspace-cache-version.module';
import { UpdateMessageChannelSyncStatusEnumCommand } from 'src/database/commands/0-20-update-message-channel-sync-status-enum.command';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { AddGraphqlConstraintsCommentsCommand } from 'src/database/commands/0.0.21-add-graphql-constraints-comments.command';
import { WorkspaceMigrationModule } from 'src/engine/metadata-modules/workspace-migration/workspace-migration.module';
import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { RelationMetadataEntity } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';

@Module({
  imports: [
    WorkspaceManagerModule,
    DataSourceModule,
    TypeORMModule,
    TypeOrmModule.forFeature([Workspace, FeatureFlagEntity], 'core'),
    TypeOrmModule.forFeature(
      [FieldMetadataEntity, ObjectMetadataEntity, RelationMetadataEntity],
      'metadata',
    ),
    WorkspaceModule,
    WorkspaceDataSourceModule,
    WorkspaceSyncMetadataModule,
    ObjectMetadataModule,
    DataSeedDemoWorkspaceModule,
    WorkspaceCacheVersionModule,
    WorkspaceMigrationModule,
  ],
  providers: [
    DataSeedWorkspaceCommand,
    DataSeedDemoWorkspaceCommand,
    WorkspaceAddTotalCountCommand,
    ConfirmationQuestion,
    StartDataSeedDemoWorkspaceCronCommand,
    StopDataSeedDemoWorkspaceCronCommand,
    UpdateMessageChannelVisibilityEnumCommand,
    UpdateMessageChannelSyncStatusEnumCommand,
    AddGraphqlConstraintsCommentsCommand,
  ],
})
export class DatabaseCommandModule {}
