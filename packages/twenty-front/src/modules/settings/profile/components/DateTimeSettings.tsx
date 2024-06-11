import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { DateTimeSettingsDateFormatSelect } from '@/settings/profile/components/DateTimeSettingsDateFormatSelect';
import { DateTimeSettingsTimeFormatSelect } from '@/settings/profile/components/DateTimeSettingsTimeFormatSelect';
import { DateTimeSettingsTimeZoneSelect } from '@/settings/profile/components/DateTimeSettingsTimeZoneSelect';
import { DateFormat } from '@/workspace-member/constants/DateFormat';
import { TimeFormat } from '@/workspace-member/constants/TimeFormat';
import { detectTimeZone } from '@/workspace-member/utils/detectTimeZone';
import { isDefined } from '~/utils/isDefined';
import { isEmptyObject } from '~/utils/isEmptyObject';
import { logError } from '~/utils/logError';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const DateTimeSettings = () => {
  const [currentWorkspaceMember, setCurrentWorkspaceMember] = useRecoilState(
    currentWorkspaceMemberState,
  );
  const [timeZone, setTimeZone] = useState(
    currentWorkspaceMember?.preferredTimeZone ?? detectTimeZone(),
  );
  const [dateFormat, setDateFormat] = useState(
    currentWorkspaceMember?.preferredDateFormat ?? DateFormat.MONTH_FIRST,
  );
  const [timeFormat, setTimeFormat] = useState(
    currentWorkspaceMember?.preferredTimeFormat ?? TimeFormat.MILITARY,
  );

  const { updateOneRecord } = useUpdateOneRecord({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });

  const updateWorkspaceMember = useCallback(
    async (changedFields: any) => {
      if (!currentWorkspaceMember?.id) {
        throw new Error('User is not logged in');
      }

      try {
        await updateOneRecord({
          idToUpdate: currentWorkspaceMember.id,
          updateOneRecordInput: changedFields,
        });
      } catch (error) {
        logError(error);
      }
    },
    [currentWorkspaceMember, updateOneRecord],
  );

  useEffect(() => {
    if (!isDefined(currentWorkspaceMember)) {
      return;
    }
    const changedFields: any = {};

    if (timeZone !== currentWorkspaceMember.preferredTimeZone) {
      changedFields.preferredTimeZone = timeZone;
    }
    if (dateFormat !== currentWorkspaceMember.preferredDateFormat) {
      changedFields.preferredDateFormat = dateFormat;
    }
    if (timeFormat !== currentWorkspaceMember.preferredTimeFormat) {
      changedFields.preferredTimeFormat = timeFormat;
    }

    if (!isEmptyObject(changedFields)) {
      setCurrentWorkspaceMember({
        ...currentWorkspaceMember,
        ...changedFields,
      });

      updateWorkspaceMember(changedFields);
    }
  }, [
    currentWorkspaceMember,
    timeZone,
    dateFormat,
    timeFormat,
    updateWorkspaceMember,
    setCurrentWorkspaceMember,
  ]);

  if (!isDefined(currentWorkspaceMember)) return;

  return (
    <StyledContainer>
      <DateTimeSettingsTimeZoneSelect value={timeZone} onChange={setTimeZone} />
      <DateTimeSettingsDateFormatSelect
        value={dateFormat}
        onChange={setDateFormat}
        timeZone={timeZone}
      />
      <DateTimeSettingsTimeFormatSelect
        value={timeFormat}
        onChange={setTimeFormat}
        timeZone={timeZone}
      />
    </StyledContainer>
  );
};