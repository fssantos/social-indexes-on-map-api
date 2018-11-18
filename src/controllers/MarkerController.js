#!/usr/bin/env node
"use strict";
const MarkerModel = require('../models/MarkerModel');
const PnudModel = require('../models/PnudModel');

const TYPE = {
    ULTRA: 'ULTRA',
    MIX: 'MIX',
    NATURA: 'NATURA',
}


class MarkerController {
    static async get(req, res, next) {
        const { id } = req.params;

        try {

            const marker = await MarkerModel.get(id);

            res.send(marker);
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }

    static async list(req, res, next) {
        try {

            const markers = await MarkerModel.list();

            const onlySome = markers.slice(0, 15000);


            res.send(markers);
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }

    static async listJoiningPnudInfos(req, res, next) {
        const queryType = req.query.type;
        const queryColumnsArray = req.query.columns.split(',');
        console.log(queryColumnsArray);
        try {
            const markers = await MarkerModel.listJoiningPnudInfos(queryType, queryColumnsArray);

            res.send(markers);

        } catch (e) {
            res.send(401).json({ code: 'error' });
        }

    }

    static async search(req, res, next) {

        const queryType = req.query.type;

        try {

            switch (queryType) {
                case 'DENSITY': {
                    const densities = await MarkerModel.listByPnudId('', '');
                    res.send(densities);
                    break;
                }
                case 'RELATIVE_DENSITY_BY_TYPE': {
                    const densities = await MarkerModel.listByPnudId('', '');
                    const relativeDensitiesByType = densities.map(e => {
                        return {
                            pnudId: e.id,
                            ULTRA: e.ULTRA === 0 ? 0 : e.ULTRA / (e.ULTRA + e.MIX + e.NATURA),
                            MIX: e.MIX === 0 ? 0 : e.MIX / (e.ULTRA + e.MIX + e.NATURA),
                            NATURA: e.NATURA === 0 ? 0 : e.NATURA / (e.ULTRA + e.MIX + e.NATURA),
                        }
                    })
                    res.send(relativeDensitiesByType);
                    break;
                }
                case 'RELATIVE_DENSITY_BY_POPULATION': {
                    const densities = await MarkerModel.listByPnudId('', '');
                    const PNUDData = await PnudModel.list();
                    const relativeDensitiesByPopulation = densities.map((e, i) => {
                        return {
                            pnudId: e.id,
                            totalPopulation: PNUDData[i].PESOTOT,
                            ULTRA: e.ULTRA === 0 ? 0 : (e.ULTRA / PNUDData[i].PESOTOT) * 1000,
                            MIX: e.MIX === 0 ? 0 : (e.MIX / PNUDData[i].PESOTOT) * 1000,
                            NATURA: e.NATURA === 0 ? 0 : (e.NATURA / PNUDData[i].PESOTOT) * 1000,
                        }
                    })
                    res.send(relativeDensitiesByPopulation);
                    break;
                }
                default: {
                    res.send({ code: 'unknow operation' });
                }
            }

        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }
}


module.exports = MarkerController;
