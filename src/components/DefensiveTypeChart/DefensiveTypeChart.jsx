import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';





import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";



import AnalyzeTeam from '../AnalyzeTeam/AnalyzeTeam';
import AnalyzeTeamItem from '../AnalyzeTeamItem/AnalyzeTeamItem';

import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';
import AnalyzeTeamMenu from '../AnalyzeTeamMenu/AnalyzeTeamMenu';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './DefensiveTypeChart.css'

function DefensiveTypeChart({ analysisTeam }) {

    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }

    // console.log('analysis team', analysisTeam);

    const typeReducer = useSelector((store) => store.typeList)

    const typeArray = typeReducer.map((type) => {
        return type.name;
    }).sort();

    const damageRelationArray = analysisTeam.map((pokemon) => {
        return pokemon.typeData;
    })

    console.log('damageRelationArray', damageRelationArray);

    // console.log('typeArray', typeArray);

    for (let typeName of typeArray) {
        for (let pokemon of damageRelationArray) {
            for (let type of pokemon) {
                for (let weakness of type.damage_relations.double_damage_from) {
                    if (weakness & weakness.name === typeName) {
                        console.log('weakness found!', weakness.name);
                    }
                }
                for (let resistance of type.damage_relations.half_damage_from) {
                    if (resistance && resistance.name === typeName) {
                        console.log('resistance found!', resistance.name);
                    }
                }
                for (let immunity of type.damage_relations.no_damage_from) {
                    if (immunity && immunity.name === typeName) {
                        console.log('weakness found!', immunity.name);
                    }
                }

            }
        }
    }




    const rows = [
        {
            name: 'Fire',
            pokemon1: '2x',
            pokemon2: 'Neutral',
            pokemon3: '1/2x',
            pokemon4: '1/2x',
            pokemon5: '1/2x',
            pokemon6: 'Neutral',
        }
    ];

    const totalRows = [
        {
            type: 'Bug',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Dark',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Dragon',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Electric',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fairy',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fighting',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fire',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Flying',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ghost',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Grass',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ground',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ice',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Normal',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Poison',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Pyschic',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Rock',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Steel',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Water',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Total',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
    ];


    return (
        <>
            <div className='table-grid-style'>
                <TableContainer className='defensive-types-table' component={Paper}>
                    <Table size="small" aria-label='simple-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Types</TableCell>
                                {analysisTeam[0] ?
                                    <TableCell>{capitalize(analysisTeam[0]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[1] ?
                                    <TableCell>{capitalize(analysisTeam[1]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[2] ?
                                    <TableCell>{capitalize(analysisTeam[2]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[3] ?
                                    <TableCell>{capitalize(analysisTeam[3]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[4] ?
                                    <TableCell>{capitalize(analysisTeam[4]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[5] ?
                                    <TableCell>{capitalize(analysisTeam[5]?.name)}</TableCell> : <></>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    {analysisTeam[0] ?
                                        <TableCell align="left">{row.pokemon1}</TableCell> : <></>
                                    }
                                    {analysisTeam[1] ?
                                        <TableCell align="left">{row.pokemon2}</TableCell> : <></>
                                    }
                                    {analysisTeam[2] ?
                                        <TableCell align="left">{row.pokemon3}</TableCell> : <></>
                                    }
                                    {analysisTeam[3] ?
                                        <TableCell align="left">{row.pokemon4}</TableCell> : <></>
                                    }
                                    {analysisTeam[4] ?
                                        <TableCell align="left">{row.pokemon5}</TableCell> : <></>
                                    }
                                    {analysisTeam[5] ?
                                        <TableCell align="left">{row.pokemon6}</TableCell> : <></>}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>


                <TableContainer className='totals-table' component={Paper}>
                    <Table size="small" aria-label='total-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Weaknesses</TableCell>
                                <TableCell>Resistances</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {totalRows.map((row) => (
                                <TableRow
                                    key={row.type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="left">{row.weaknessTotal}</TableCell>
                                    <TableCell align="left">{row.resistanceTotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>
            </div>

        </>

    )
}

export default DefensiveTypeChart;