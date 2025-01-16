export enum ServiceMessagePattern {
  CREATE = 'service.create',
  FIND_ONE_BY_ID = 'service.find_one_by_id',
  UPDATE = 'service.update',
  FIND_ALL = 'service.find_all',
  SAVE = 'service.save'
}

export enum ServiceRequestMessagePattern {
  CREATE = 'service-request.create',
  FIND_ONE_BY_ID = 'service-request.find_one_by_id',
  UPDATE = 'service-request.update',
  FIND_ALL = 'service-request.find_all',
  SAVE = 'service-request.save',
  CREATE_AND_SAVE = 'service-request.create_and_save'
}

export enum FeedbackMessagePattern {
  CREATE = 'feedback.create',
  FIND_ONE_BY_ID = 'feedback.find_one_by_id',
  UPDATE = 'feedback.update',
  FIND_ALL = 'feedback.find_all',
  SAVE = 'feedback.save',
  CREATE_AND_SAVE = 'feedback.create_and_save'
}

export enum OrderMessagePattern {
  CREATE = 'order.create',
  FIND_ONE_BY_ID = 'order.find_one_by_id',
  UPDATE = 'order.update',
  FIND_ALL = 'order.find_all',
  SAVE = 'order.save',
  CREATE_AND_SAVE = 'order.create_and_save'
}

export enum TransactionMessagePattern {
  CREATE = 'transaction.create',
  FIND_ONE_BY_ID = 'transaction.find_one_by_id',
  UPDATE = 'transaction.update',
  FIND_ALL = 'transaction.find_all',
  SAVE = 'transaction.save',
  CREATE_AND_SAVE = 'transaction.create_and_save',
  GET_LINK_PAY_FROM_MOMO = 'transactions.getLinkPayFromMomo',
}



