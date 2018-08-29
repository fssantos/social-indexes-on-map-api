#!/usr/bin/env node
"use strict";


const rents = {
    list: (req, res, next) => {
        res.send({ rents: "an array of rents" });
    },

    create(req, res, next) {
        const data = req.body;

        setTimeout(() => { res.json(data) }, 3000);

        return;

        /*         coupon
                    .save()
                    .then(newCoupon => {
                        res.json(newCoupon);
                    })
                    .catch(error => {
                        next(error);
                    }); */
    },

    update(req, res, next) {
        const id = req.params.id || "";
        const data = (req.body);

        setTimeout(() => {
            res.json({ data: data, id: id })
        }, 3000);

        return;



        /*         Coupon.findOneAndUpdate(
                    {
                        _id: id
                    },
                    { $set: data },
                    { new: true }
                )
                    .exec()
                    .then(updatedCoupon => {
                        res.json(updatedCoupon);
                    })
                    .catch(error => {
                        next(error);
                    }); */
    },


}

export default rents;