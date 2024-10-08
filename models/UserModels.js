const sequelize = require('../Config/DBs');
const Datatypes = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Company = require('./CompanyModels');
// const Announcement = require('./createAnnouncementModels');

const User = sequelize.define(
    'User',
    {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        name: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        user_password: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        user_photo: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        phone_number: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        p_isd: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        whatsapp_no: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        w_isd: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        otp: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        position: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        is_login: {
            type: Datatypes.BOOLEAN,
            defaultValue: 0,
        },
        is_verified: {
            type: Datatypes.BOOLEAN,
            defaultValue: 0,
        },
        company_id: {
            type: Datatypes.INTEGER,
            allowNull: true,
        },
        departments_id: {
            type: Datatypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: Datatypes.BOOLEAN,
            defaultValue: 0,
        },
        remember_token: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        user_roles: {
            type: Datatypes.ENUM,
            values: ['administration', 'growth champion', 'decision maker'],
        },
        department: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        notes: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        twitter_url: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        linkedin_url: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: Datatypes.DATEONLY,
            allowNull: true,
        },
        hire_date: {
            type: Datatypes.DATEONLY,
            allowNull: true,
        },
        hobbies: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        D :{
            type : Datatypes.INTEGER,
            allowNull: true
        },
        I :{
            type : Datatypes.INTEGER,
            allowNull:true
        },
        S :{
            type :Datatypes.INTEGER,
            allowNull: true
        },
        C: {
            type : Datatypes.INTEGER,
            allowNull:true
        },
        D2:{
            type : Datatypes.INTEGER,
            allowNull:true 
        },
        I2:{
            type : Datatypes.INTEGER,
            allowNull:true
        },
        S2:{
            type : Datatypes.INTEGER,
            allowNull:true
        },
        C2:{
            type : Datatypes.INTEGER,
            allowNull:true
        },
        assignTaskAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          taskDueTodayAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          changeDueDateAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          completeTaskAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          stuckAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          unstuckAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          weeklyAlert: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
          },
          companyId: {
            type: Datatypes.INTEGER,
            references: {
                model: 'companies', // This should match the table name of the Company model
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },

    },
    {
        tableName: 'users',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: 'updated_at',
    },
);

User.beforeCreate(async function (user) {
    if (user.changed('user_password')) {
        const salt = await bcrypt.genSalt(10);
        user.user_password = await bcrypt.hash(user.user_password, 10);
        console.log(user.user_password);
    }
});

User.generateToken = function ({ id, name, email, company_id }) {
    const token = jwt.sign({ id, name, email, company_id }, "econstra", { expiresIn: '1h' });
    return token;
};

User.LoginUser = (user) => {
    const userSchema = Joi.object({
        email: Joi.string().email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).required().messages({
            "string.pattern.base": "Please Enter a valid email"
        }),
        user_password: Joi.string().required(),
    });
    return userSchema.validateAsync(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } });
};

Company.hasMany(User, { foreignKey: 'companyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = User;
