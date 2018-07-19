import * as React from 'react';
import '../sass/App.css';
import { connect } from 'react-redux';
import Navigation from '../containers/navigation';
import StructurePage from '../containers/structure_page';

// const stages = {
//   'useraccess': <UserAccessStage />,
//   'massdelete': <MassUserDeleteStage />,
//   'matrix': <MatrixStage />,
//   'allusers': <AllUsersStage />,
//   'structure': <StructureStage />,
//   'folders': <EmptyFolderStage />,
//   'workflows': <WorkflowsStage />,
//   'lists': <ListsInformationStage />,
//   'structurePage': <StructurePage />
// };

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    // let that = this;

    return (
      <div>
        {window.location.href.split('index.aspx/')[1] === 'structure_page' ?
          <StructurePage />
          :
          <div>
            <Navigation />
            {/* <div>
              {
                this.props.groups.length > 0 ?
                  Object.keys(stages).map((e: any) => {
                    let currentStage = that.props.stage;
                    if (currentStage === e) {
                      return (
                        <div className="dislpayedComponent">
                          {stages[e]}
                        </div>
                      );
                    } else {
                      return;
                    }
                  })
                  :
                  <div />
              }
            </div> */}
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ users, stage, groups }: any) {
  return {
    users,
    stage,
    groups
  };
}

export default connect(mapStateToProps, null)(App);
