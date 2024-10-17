/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
// const { models } = require('mongoose');
const { connectDatabase } = require('../../utils/shared');
const ActivationKeysSchema = require('../ActivationKeys');
const AttachmentsSchema = require('../Attachments');
const ChatgptPacketsSchema = require('../ChatgptPackets');
const ChatgptsSchema = require('../Chatgpts');
const CollectionsSchema = require('../Collections');
const ConfigsSchema = require('../Configs');
const CouponsSchema = require('../Coupons');
const DatasetsSchema = require('../Datasets');
const DocsSchema = require('../Docs');
const BrandVoicesSchema = require('../BrandVoices');
const CustomPromptCollectionsSchema = require('../CustomPromptCollections');
const HistoryLoginsSchema = require('../HistoryLogins');
const HistoryUsedCreditsSchema = require('../HistoryUsedCredits');
const LicensesSchema = require('../Licenses');
const MessagesSchema = require('../Messages');
const NotificationsSchema = require('../Notifications');
const PromptAttributeSchema = require('../PromptAttributes');
const PlansSchema = require('../Plans');
const PointSchema = require('../Points');
const PromptCategorySchema = require('../PromptCategories');
const PromptSchema = require('../Prompts');
const PromptCollectionSchema = require('../PromptCollections');
const PromptUserActionSchema = require('../PromptUserActions');
const ThreadsSchema = require('../Threads');
const TransactionSchema = require('../Transactions');
const PromptWorkflowSchema = require('../PromptWorkflows');
const PromptCelebritySchema = require('../PromptCelebrities');
const TagsSchema = require('../Tags');

const SharesSchema = require('../Shares');
const FavoriteHistoriesSchema = require('../FavoriteHistories');
const UserLogsSchema = require('../UserLogs');
const UserPlanOptionsSchema = require('../UserPlanOptions');
const UserPlanSchema = require('../UserPlans');
const OrdersSchema = require('../Orders');
const OrderDetailsSchema = require('../OrderDetails');
const UserSchema = require('../Users');
const VoiceConvertsSchema = require('../VoiceConverts');
const VoiceStyleSchema = require('../VoiceStyles');
const SpeechToTextsSchema = require('../SpeechToTexts');
const FeaturesSchema = require('../Features');
const FeaturePricesSchema = require('../FeaturePrices');
const FeatureOptionsSchema = require('../FeatureOptions');
const FeatureHistoriesSchema = require('../FeatureHistories');
const PluginSchema = require('../Plugins');
const AssistantModel = require('../Assistants');
const CommentsModel = require('../Comments');

const TextEmbeddingSchema = require('../TextEmbeddings');

const models = {
    text_embeddings: TextEmbeddingSchema,
};
module.exports = {
    activation_keys: ActivationKeysSchema,
    attachments: AttachmentsSchema,
    brand_voices: BrandVoicesSchema,
    chatgpt_packets: ChatgptPacketsSchema,
    chatgpts: ChatgptsSchema,
    collections: CollectionsSchema,
    configs: ConfigsSchema,
    coupons: CouponsSchema,
    datasets: DatasetsSchema,
    docs: DocsSchema,
    custom_prompt_collections: CustomPromptCollectionsSchema,
    history_logins: HistoryLoginsSchema,
    history_used_credits: HistoryUsedCreditsSchema,
    messages: MessagesSchema,
    notifications: NotificationsSchema,
    plans: PlansSchema,
    points: PointSchema,
    prompt_attribute: PromptAttributeSchema,
    prompt_categories: PromptCategorySchema,
    prompt_collections: PromptCollectionSchema,
    prompt_user_actions: PromptUserActionSchema,
    prompt_workflows: PromptWorkflowSchema,
    prompt_celebrities: PromptCelebritySchema,
    tags: TagsSchema,
    shares: SharesSchema,
    favorite_histories: FavoriteHistoriesSchema,
    orders: OrdersSchema,
    order_details: OrderDetailsSchema,
    prompts: PromptSchema,
    threads: ThreadsSchema,
    transactions: TransactionSchema,
    licenses: LicensesSchema,
    user_plan_options: UserPlanOptionsSchema,
    user_plans: UserPlanSchema,
    user_logs: UserLogsSchema,
    users: UserSchema,
    voice_converts: VoiceConvertsSchema,
    voice_styles: VoiceStyleSchema,
    speech_to_texts: SpeechToTextsSchema,
    features: FeaturesSchema,
    feature_prices: FeaturePricesSchema,
    feature_options: FeatureOptionsSchema,
    feature_histories: FeatureHistoriesSchema,
    plugins: PluginSchema,
    assistants: AssistantModel,
    comments: CommentsModel,
    connectToModels: ({ databaseName, currentModels = [], otherModels = [] }) => {
        const conn = connectDatabase(databaseName);
        otherModels.forEach((model) => {
            conn.model(model, models[model]);
        });
        const objCurrentModels = currentModels.reduce((initObj, currModel) => {
            initObj[currModel] = conn && conn.model ? conn.model(currModel, models[currModel]) : null;
            return initObj;
        }, {});
        objCurrentModels.connectToModel = (model) => {
            conn.model(model, models[model]);
        };
        return objCurrentModels;
    },
};
