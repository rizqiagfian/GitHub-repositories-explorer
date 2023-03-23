import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { axiosGitHubGraphQL } from '../services';
import { graphqlQuery } from '../services';
import { BlackoutLoading } from './Loading';
import { Dialog } from 'primereact/dialog';

const Content: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("")
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [activeIndex, setActiveIndex] = useState<number | any>(0)
    const [clickSearch, setClickSearch] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataList, setDataList] = useState<any[]>([])
    const [errorDialog, setErrorDialog] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")


    const search = async () => {
        setClickSearch(false)
        setSearchKeyword("")
        if (keyword) {
            setSearchKeyword(keyword)
            setClickSearch(true)
            onFetchFromGitHub()
        }
    }

    const onFetchFromGitHub = () => {
        setLoading(true)
        axiosGitHubGraphQL
            .post('', {
                query: graphqlQuery,
                variables: {
                    "number_of_repos": 99,
                    "number_of_users": 5,
                    "username": keyword
                }
            })
            .then(result => {
                if (!result?.data?.errors) {
                    setDataList(result?.data?.data?.search?.nodes)
                } else {
                    setErrorMessage(result.data.errors[0].message || "Some error while get data users")
                    setErrorDialog(true)
                }
                setLoading(false)
            }
            );
    };

    return (
        <>
            <div className="content" style={{ marginBottom: '2rem' }}>
                <div className='grid col-12'>
                    <div className='col-12 md:col-10'>
                        <span className="p-input-icon-left" style={{ width: '100%' }}>
                            <i className="pi pi-search" style={{ marginLeft: '8px' }} />
                            <InputText style={{ width: '100%', borderRadius: '1rem', paddingLeft: '2.5rem' }} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter Username" />
                        </span>
                    </div>
                    <div className='col-12 md:col-2'>
                        <Button icon="pi pi-search" className="p-button-primary" label='Search' style={{ width: '100%', borderRadius: '1rem' }} onClick={() => search()} />
                    </div>
                </div>
                <div className='col-12 fluid' >

                    {
                        clickSearch &&
                        <p className='font-montserrat' style={{ margin: '0 0 1rem 0' }}>Showing users for <strong>"{searchKeyword}"</strong></p>
                    }

                    {
                        dataList.length > 0 &&
                        <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>

                            {
                                dataList?.length > 0 && dataList.map((item, i) => {
                                    return (
                                        <AccordionTab header={item?.name ? item?.name : item?.login ? item?.login : '-'} contentStyle={{ marginBottom: '1rem' }} headerStyle={{ marginBottom: activeIndex === i ? '0' : '1rem' }} tabIndex={i}>

                                            {
                                                item?.repositories?.nodes?.length > 0 && item?.repositories?.nodes.map((data: any) => {
                                                    return (
                                                        <div className='col-12 flex' style={{ backgroundColor: '#e8ecf4', borderRadius: '5px', marginBottom: '1rem' }}>
                                                            <div className='col-10' style={{ textAlign: 'left' }}>
                                                                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{data?.name ? data?.name : "-"}</p>
                                                                <p style={{ margin: '0' }}>{data?.description ? data?.description : "-"}</p>
                                                            </div>
                                                            <div className='col-2'>
                                                                <p>{data?.stargazerCount ? data?.stargazerCount : 0} <i className='pi pi-star-fill'></i></p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </AccordionTab>
                                    )
                                })
                            }


                        </Accordion>
                    }

                </div>
            </div>
            <BlackoutLoading loading={loading} />

            <Dialog blockScroll={true} className="dialog-response-fail" header={"Error"} visible={errorDialog} onHide={() => setErrorDialog(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }} draggable={false}>
                <div className="p-col-12 p-d-flex">
                    <p style={{ marginLeft: '10px', width: '100%' }}>{errorMessage}</p>
                </div>
                <div className="p-col-12" style={{ textAlign: 'end', marginTop: '0.5rem' }}>
                    <Button label="OK" style={{ textAlign: 'center', width: '5rem', backgroundColor: '#D01224' }} onClick={() => setErrorDialog(false)} />
                </div>
            </Dialog>
        </>
    );
}

export default Content;