import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from './UserSettings.schema';
import { CreateSettingsInput } from '../dto/create-settings.input';
import { mockUserSettings } from 'src/_mocks_/mockUserSettings';

@Resolver(() => UserSetting)
export class UserSettingResolver {
  @Mutation(() => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData') createUserSettingsData: CreateSettingsInput,
  ) {
    mockUserSettings.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
