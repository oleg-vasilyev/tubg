import { Provider } from 'mobx-react';
import * as React from 'react';
import { bfStore } from 'stores/battlefieldStore';
import { optionsStore } from 'stores/OptionsStore';
import { BattlefieldComponent } from './components/battlefieldComponent/battlefieldComponent';

export class AnimatedGame extends React.Component {
  public render() {
    return (
      <Provider bfStore={bfStore}>
        <BattlefieldComponent options={optionsStore.options} />
      </Provider>
    );
  }
}
