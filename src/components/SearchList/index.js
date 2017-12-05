import React from 'react';

import ReactTable  from "react-table";
import "react-table/react-table.css";

export const SearchList = ({repo, loading, total, next}) => {

    return (
        <div>
            <ReactTable
                manual
                showPaginationTop
                showPaginationBottom={false}
                data={repo}
                loading={loading}
                showPageSizeOptions={false}
                pageSize={repo.length}
                pages={total}
                showPageJump={false}
                onFetchData={next}
                columns={[
                    {
                        columns: [
                            {
                                Header: "First Name",
                                accessor: "full_name"
                            },

                        ]
                    },
                    {
                        columns: [
                            {
                                Header: "Owner",
                                id: "owner",
                                accessor: d => d.owner.login
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                Header: "Stars",
                                accessor: "stargazers_count"
                            }
                        ]
                    }
                ]}
                className="-striped -highlight"
            />
        </div>
    );
}